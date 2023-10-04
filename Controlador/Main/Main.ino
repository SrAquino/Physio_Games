#include <BleKeyboard.h>
#include <MPU6050_tockn.h>
#include <Wire.h>
#include <TaskScheduler.h>

BleKeyboard bleKeyboard;
MPU6050 mpu6050(Wire);
Scheduler runner;

void GyroTaskCallback();
void BluetoothTaskCallback();


Task GyroTask(100, TASK_FOREVER, &GyroTaskCallback);
Task BluetoothTask(100, TASK_FOREVER, &BluetoothTaskCallback);




void setup() {
  Serial.begin(115200);
  Serial.println("Starting BLE work!");
  bleKeyboard.begin();

  Wire.begin();
  mpu6050.begin();
  mpu6050.calcGyroOffsets(true);

  // Agende as tarefas para serem executadas em paralelo
  runner.init();
  runner.addTask(GyroTask);
  runner.addTask(BluetoothTask);
  GyroTask.enable();
  BluetoothTask.enable();
}

void loop() {
  runner.execute();
}

void GyroTaskCallback() {
  mpu6050.update();

}

void BluetoothTaskCallback() {
  if (bleKeyboard.isConnected()) {

    if(mpu6050.getAngleZ() > 0){
        
      if(mpu6050.getAngleX() < 0) {
        bleKeyboard.write(KEY_LEFT_ARROW);
        Serial.println("Esquerda");
      } 
      else {
        bleKeyboard.write(KEY_RIGHT_ARROW);
        Serial.println("Direita");
      } 
    } else {
      Serial.print("Mantenha Z maior que 0 para iniciar: ");
      Serial.println(mpu6050.getAngleZ());
    }

  } else {
    Serial.println("Waiting...");
  }
}

