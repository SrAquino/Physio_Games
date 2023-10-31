#include <MPU6050_tockn.h>
#include <Wire.h>

MPU6050 mpu6050(Wire);


void setup() {
  Serial.begin(115200);

  Wire.begin();
  mpu6050.begin();
  mpu6050.calcGyroOffsets(true);
}

void loop() {

  mpu6050.update();
  if (mpu6050.getAngleX() < -90) {
    Serial.println(1);
  } else if (mpu6050.getAngleX() < -60 && mpu6050.getAngleX() > -90) {
    Serial.println(3);
  } else if (mpu6050.getAngleX() > -60) {
    Serial.println(2);
  }
}
