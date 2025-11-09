## Building an End-to-End Autonomous Driving Stack

Autonomous driving (AD) is arguably one of the most complex engineering challenges of our time. It requires a seamless fusion of advanced perception, split-second planning, and precise control. In a 2023-2025 project, researcher Chris Sunny Thaliyath documented the journey of building a complete, end-to-end autonomous vehicle stack from the ground up.

The project's goal was to create a "Software-in-the-Loop" (SIL) system to develop, train, and test modern autonomous driving models in a high-fidelity simulator. This digital testbed is the essential first step before any code ever touches a real vehicle.

### The Toolkit: A Virtual Car in a Virtual World

To build a self-driving "brain," you first need a car and a world to test it in. The project leveraged an industry-standard toolkit:

* **Simulator:** **CARLA** was used as the virtual environment. It provides a hyper-realistic world, complete with a full suite of vehicle sensors: 6 cameras, LIDAR, RADAR, IMU, and GPS.
* **The "Nervous System":** The **Robot Operating System (ROS)** was used to pipe all this data around. It's the software backbone that connects the car's "eyes" (sensors) to its "brain" (the AI models).
* **The "Textbooks":** The AI models were trained on massive, real-world datasets like **Nuscenes**, **Kitti**, and **Waymo**, which provide the ground truth for perception.

### The Core of the Stack: Perception and Planning

The project's work log shows a systematic build-up of a state-of-the-art perception stack.

1.  **From Point Clouds to Bird's-Eye View (BEV):**
    A core component of modern autonomy is the **Bird's-Eye View (BEV)**. The project successfully implemented a pipeline to take raw, 3D LIDAR point cloud data and "squash" it into a 2D top-down map. This BEV representation is what the AI uses to "see" the world and plan a path.

2.  **Building the Perception Models:**
    The project integrated and trained key 3D object detection models, including **PointPillar**, a foundational model for processing LIDAR data. The work culminated in a major milestone: getting **BEVFusion** running. This is a state-of-the-art model that fuses data from *both* the LIDAR and all 6 cameras, creating a much richer and more robust understanding of the environment.

3.  **Achieving Real-Time Performance:**
    A perception model is useless if it's too slow. A critical achievement was optimizing the massive BEVFusion model using **TensorRT** (NVIDIA's high-performance inference optimizer). This allowed the complete, multi-modal perception stack to run in **real-time**, publishing its results over ROS.



### Closing the Loop: From AI Decision to Actuation

The final piece of the puzzle was to "close the loop." It's not enough for the AI to just *see* the world (open-loop); its decisions must actually *control the car*.

This was accomplished by integrating a **Model Predictive Controller (MPC)**. This advanced controller takes the desired path from the AI's planning module and translates it into smooth steering and acceleration commands for the CARLA vehicle.

By connecting the real-time BEVFusion model's output to the MPC controller's input, the project achieved a true **Closed-Loop Testing scenario**. The AI "drives" the car, and the car's new position is fed back to the AI in a continuous, real-time loop.

### The Result: A Powerful Testbed for Autonomous Driving

The final system is a powerful and complete testbed for validating end-to-end ADAS stacks. It allows for the benchmarking of various models (like VAD, PPGEO, or UniAD) and measures them against the metrics that matter:

* **Route Completion (RC):** Can the car successfully navigate to its target?
* **Collisions:** How many collisions does it have per kilometer?
* **Smoothness:** Is the ride comfortable, or is it jerky and unsafe?

This project serves as a comprehensive "how-to" for building the brain of a self-driving car, starting from raw data and ending with a fully autonomous agent driving itself in a virtual world.