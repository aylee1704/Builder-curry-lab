#include <ESP32Servo.h>
#include <HX711.h>

// ——— Pines servos, botones y buzzer ———
const int pinesServos[4]  = {5, 17, 16, 4};
const int pinesBotones[4] = {32, 33, 25, 26};
const int pinBuzzer       = 13;

// ——— Pines HX711 ———
#define DT1  23  // Módulo 1, canal A → servo 0
#define SCK1 22
#define DT2  31  // Módulo 2, canal A → servo 2
#define SCK2 30

// ——— Parámetros de escala (calibrar!) ———
// index: 0 = mod1/A, 1 = mod1/B, 2 = mod2/A, 3 = mod2/B
float scaleFactors[4] = {2280.0, 2280.0, 2280.0, 2280.0};
int   gains[4]        = {128, 32, 128, 32};

const float UMBRAL_GRAMOS       = 10.0;      // umbral para detener servo
const unsigned long HOLD_MS     = 2000;      // ms de espera con peso aplicado
const int STEP_DELAY_UP   = 30;              // ms por grado al subir
const int STEP_DELAY_DOWN = 10;              // ms por grado al bajar

// ——— Variables de juego ———
const int numeroDeRondas = 3;
int ordenServos[4]       = {0, 1, 2, 3};
int contadorAciertos     = 0;
int contadorErrores      = 0;

HX711 scale1, scale2;
Servo servos[4];

// ——— Función para hacer sonar el buzzer ———
void beepBuzzer(int ms, int repeticiones = 1, int pausa = 100) {
  for (int i = 0; i < repeticiones; i++) {
    digitalWrite(pinBuzzer, HIGH);
    delay(ms);
    digitalWrite(pinBuzzer, LOW);
    if (i < repeticiones - 1) delay(pausa);
  }
}

// ——— Lectura de peso para servo idx (0–3) ———
float readWeight(int idx) {
  HX711 &sc = (idx < 2) ? scale1 : scale2;
  sc.set_scale(scaleFactors[idx]);
  sc.set_gain(gains[idx]);
  return sc.get_units(10);
}

void setup() {
  Serial.begin(115200);
  delay(1500);  // tiempo para abrir el monitor

  // Buzzer
  pinMode(pinBuzzer, OUTPUT);
  digitalWrite(pinBuzzer, LOW);
  // BEEP de inicio (2 s)
  beepBuzzer(2000, 1);

  Serial.println("=== Iniciando sistema con HX711 y rondas ===");

  // Inicializar servos y botones
  for (int i = 0; i < 4; i++) {
    servos[i].setPeriodHertz(50);
    servos[i].attach(pinesServos[i]);
    servos[i].write(0);
    pinMode(pinesBotones[i], INPUT_PULLUP);
  }

  // Inicializar HX711
  scale1.begin(DT1, SCK1);
  scale2.begin(DT2, SCK2);
  scale1.tare();
  scale2.tare();

  Serial.println("Listo: cada servo girará hasta detectar 10 g, esperará 2 s y regresará a 0°.");
}

void loop() {
  // Tres rondas completas
  for (int ronda = 1; ronda <= numeroDeRondas; ronda++) {
    Serial.printf("\n--- Ronda %d de %d ---\n", ronda, numeroDeRondas);

    // Barajar orden de servos
    for (int i = 3; i > 0; i--) {
      int j = random(i + 1);
      int tmp = ordenServos[i];
      ordenServos[i] = ordenServos[j];
      ordenServos[j] = tmp;
    }

    // Un paso por cada servo
    for (int paso = 0; paso < 4; paso++) {
      int idx = ordenServos[paso];
      Serial.printf("Servo %d girando hasta detectar %.1f g...\n", idx + 1, UMBRAL_GRAMOS);

      // Subida suave 0→180
      int ang;
      float peso = 0;
      for (ang = 0; ang <= 180; ang++) {
        servos[idx].write(ang);
        delay(STEP_DELAY_UP);
        peso = readWeight(idx);
        if (peso >= UMBRAL_GRAMOS) {
          Serial.printf("  • Peso detectado: %.2f g en canal %d\n", peso, idx);
          break;
        }
      }

      // Mantener posición 2 s
      delay(HOLD_MS);

      // Regreso rápido a 0°
      for (int a = ang; a >= 0; a -= 6) {
        servos[idx].write(a);
        delay(STEP_DELAY_DOWN);
      }
      servos[idx].write(0);
      Serial.printf("<<< Servo %d regresó a 0°.\n", idx + 1);

      // Lectura de botón respuesta
      Serial.printf("  • Selecciona el pulsador %d...\n", idx + 1);
      bool respondido = false;
      while (!respondido) {
        for (int b = 0; b < 4; b++) {
          if (digitalRead(pinesBotones[b]) == LOW) {
            if (b == idx) {
              Serial.println("    ✔ Respuesta correcta");
              contadorAciertos++;
            } else {
              Serial.printf("    ✖ Respuesta incorrecta (pulsador %d)\n", b + 1);
              contadorErrores++;
            }
            // Anti-rebote
            while (digitalRead(pinesBotones[b]) == LOW) delay(10);
            respondido = true;
            break;
          }
        }
      }
      delay(300);
    } // fin for paso

    delay(1000);
  } // fin for ronda

  // BEEP de fin (2 beeps cortos)
  beepBuzzer(200, 2, 200);

  // Mostrar resultados
  int total = contadorAciertos + contadorErrores;
  float pct = total ? 100.0 * contadorAciertos / total : 0;
  Serial.println("\n=== RESULTADOS FINALES ===");
  Serial.printf("Aciertos: %d (%.1f%%)\n", contadorAciertos, pct);
  Serial.printf("Errores:  %d (%.1f%%)\n", contadorErrores, 100 - pct);
  Serial.println("==========================");

  // Detener todo
  while (true) delay(1000);
}
