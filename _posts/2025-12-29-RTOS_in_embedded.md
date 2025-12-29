## RTOS in embedded


### Bare metal 


      ```
      int main(void)
      {
          system_init();

          while (1)
          {
              read_sensor();        // ~2 ms
              process_data();       // ~4 ms
              send_message();       // ~3 ms
              blink_led();          // ~1 ms
          }
      }

      ```

### What Actually Happens

      ```
      |--- read ---|--- process ---|--- send ---|--- blink ---|
      <------------------- ~10 ms ----------------------------->

      ```


#### Timing is assumed, not guaranteed

      - If send_message() blocks → everything blocks
      - Hard to add:
          Logging
          Diagnostics
          Networking
      - No task isolation


## FreeRTOS Implementaiton 


#### Task Definitions

Sensor Task (10 ms)

  ```
  void sensor_task(void *arg)
  {
      TickType_t last = xTaskGetTickCount();

      while (1)
      {
          read_sensor();
          xQueueSend(sensor_queue, &data, 0);
          vTaskDelayUntil(&last, pdMS_TO_TICKS(10));
      }
  }
  ```

#### Processing Task

```
void processing_task(void *arg)
{
    while (1)
    {
        xQueueReceive(sensor_queue, &data, portMAX_DELAY);
        process_data();
        xQueueSend(tx_queue, &result, 0);
    }
}
```

#### Communication Task

```
void comm_task(void *arg)
{
    while (1)
    {
        xQueueReceive(tx_queue, &result, portMAX_DELAY);
        send_message();
    }
}
```
#### Heartbeat Task

    ```
    void heartbeat_task(void *arg)
    {
        while (1)
        {
            toggle_led();
            vTaskDelay(pdMS_TO_TICKS(500));
        }
    }
    ```
#### System Behavior (RTOS)

  Sensor Task     : | read | wait | read | wait |
  Processing Task :      | process | wait |
  Comm Task       :          | send |
  Heartbeat       : |---- blink ----|




| Aspect    | Bare-Metal     | FreeRTOS   |
|-----------|---------------|------------|
| Timing    | Implicit      | Explicit   |
| Blocking  | Global failure| Local      |
| Scaling   | Painful       | Structured |
| Debugging | Guesswork     | Traceable  |
| Safety    | Weak          | Stronger   |
