## Quantum Machine Learning 

## Classical ML vs Quantum ML vs Hybrid ML
![Concept comparison](/images/QUANTUM_COMPUTING/CompareDifferentConcepts.jpg)



<div>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Quantum Machine Learning Architecture</title>
  <style>
    :root {
      --bg-color: #ffffff;
      --box-fill: #f8fafc;
      --box-stroke: #22d3ee;
      --text-main: #e5e7eb;
      --text-sub: #94a3b8;
      --accent-cls: #38bdf8;
      --accent-q: #a78bfa;
      --accent-hybrid: #34d399;
    }
    body {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg-color);
    }
    .chart-container {
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.6);
      color: var(--text-main);
    }
    .chart-title {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
    }
    .chart-sub {
      text-align: center;
      font-size: 14px;
      color: var(--text-sub);
      margin-bottom: 40px;
    }
    svg {
      width: 100%;
      height: auto;
    }
    .node-rect {
      fill: var(--box-fill);
      stroke-width: 2px;
      rx: 10px;
    }
    .node-header {
      font-size: 15px;
      font-weight: 700;
      fill: var(--text-main);
    }
    .node-desc {
      font-size: 12px;
      fill: var(--text-sub);
    }
    .edge-path {
      fill: none;
      stroke: #475569;
      stroke-width: 2px;
    }
    .edge-arrow {
      fill: #475569;
    }

    .cls { stroke: var(--accent-cls); }
    .quantum { stroke: var(--accent-q); }
    .hybrid { stroke: var(--accent-hybrid); }
  </style>
</head>

<body>
<div class="chart-container">
  <div class="chart-title">Quantum Machine Learning (QML) Architecture</div>
  <div class="chart-sub">Hybrid Classical–Quantum Learning Pipeline</div>

  <svg viewBox="0 0 900 520">
    <defs>
      <marker id="arrow-qml" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
        <path d="M2,2 L10,6 L2,10" class="edge-arrow" />
      </marker>
    </defs>

    <!-- Classical Data -->
    <g transform="translate(40,40)">
      <rect class="node-rect cls" width="220" height="80"/>
      <text x="20" y="30" class="node-header">1. Classical Data Input</text>
      <text x="20" y="55" class="node-desc">Images / Signals / Vectors</text>
    </g>

    <!-- Feature Extraction -->
    <g transform="translate(40,160)">
      <rect class="node-rect cls" width="220" height="90"/>
      <text x="20" y="30" class="node-header">2. Classical Preprocessing</text>
      <text x="20" y="55" class="node-desc">CNN / PCA / Feature Scaling</text>
      <text x="20" y="75" class="node-desc">(Dimensionality Reduction)</text>
    </g>

    <!-- Quantum Encoding -->
    <g transform="translate(40,300)">
      <rect class="node-rect quantum" width="220" height="90"/>
      <text x="20" y="30" class="node-header">3. Quantum Encoding</text>
      <text x="20" y="55" class="node-desc">Angle / Amplitude Encoding</text>
      <text x="20" y="75" class="node-desc">Classical → Qubits</text>
    </g>

    <!-- Problem Definition -->
    <g transform="translate(620,40)">
      <rect class="node-rect cls" width="220" height="80"/>
      <text x="20" y="30" class="node-header">4. Learning Objective</text>
      <text x="20" y="55" class="node-desc">Loss / Cost Function</text>
    </g>

    <!-- Parameter Encoding -->
    <g transform="translate(620,160)">
      <rect class="node-rect cls" width="220" height="90"/>
      <text x="20" y="30" class="node-header">5. Trainable Parameters</text>
      <text x="20" y="55" class="node-desc">Rotation Angles θ</text>
      <text x="20" y="75" class="node-desc">Optimized Classically</text>
    </g>

    <!-- Hybrid Interface -->
    <g transform="translate(310,300)">
      <rect class="node-rect hybrid" width="260" height="90"/>
      <text x="20" y="30" class="node-header">6. Hybrid Interface</text>
      <text x="20" y="55" class="node-desc">Classical ↔ Quantum Loop</text>
      <text x="20" y="75" class="node-desc">(Parameter Update)</text>
    </g>

    <!-- Quantum Model -->
    <g transform="translate(260,420)">
      <rect class="node-rect quantum" width="380" height="90"/>
      <text x="20" y="30" class="node-header">7. Variational Quantum Circuit (VQC)</text>
      <text x="20" y="55" class="node-desc">Parameterized Quantum Gates</text>
      <text x="20" y="75" class="node-desc">(QNN / QAOA / VQE)</text>
    </g>

    <!-- Connections -->
    <path d="M150 120 L150 160" class="edge-path" marker-end="url(#arrow-qml)"/>
    <path d="M150 250 L150 300" class="edge-path" marker-end="url(#arrow-qml)"/>
    <path d="M260 345 L310 345" class="edge-path" marker-end="url(#arrow-qml)"/>

    <path d="M730 120 L730 160" class="edge-path" marker-end="url(#arrow-qml)"/>
    <path d="M730 250 L730 275 L440 275 L440 300" class="edge-path" marker-end="url(#arrow-qml)"/>

    <path d="M440 390 L440 420" class="edge-path" marker-end="url(#arrow-qml)"/>
  </svg>
</div>
</body>
</html>
</div>

## Quantum Kernel Methods for Perception & Decision
![Quantum kernel](/images/QUANTUM_COMPUTING/Qantum_Kernel_Structure.jpg)



### NISQ (Noisy Intermediate-Scale Quantum)

All quantum models in this work are designed for NISQ hardware, employing shallow variational circuits and hybrid optimization to mitigate decoherence and gate noise.


![QuantumSuperPosition](/images/QUANTUM_COMPUTING/quantum_superposition.gif)

Let us write the most basic Quantum Program 

```
pip3 install pennylane
```



```
import pennylane as qml
import numpy as np
# Create a quantum device with 1 qubit
dev = qml.device("default.qubit", wires=1)
@qml.qnode(dev)
def quantum_hello():
    qml.Hadamard(wires=0)        # Put qubit into superposition
    return qml.probs(wires=0)    # Measure probabilities

print(quantum_hello())

```

If you run the above snippet , you would see something like


  [0.5 0.5]

Basically this is 

  Encode → Entangle → Measure → Optimize




#### Now that we have a small QC module , lets extend it 

![VQC](/images/QUANTUM_COMPUTING/VQC.gif)


```
import pennylane as qml
from pennylane import numpy as np

dev = qml.device("default.qubit", wires=1)


@qml.qnode(dev)
def vqc(theta):
    qml.RY(theta, wires=0)     # trainable rotation
    return qml.expval(qml.PauliZ(0))

theta = 0.3
print(vqc(theta))

def loss(theta):
    return (vqc(theta) - 1.0) ** 2

opt = qml.GradientDescentOptimizer(stepsize=0.1)

theta = np.array(0.0, requires_grad=True)

for step in range(30):
    theta = opt.step(loss, theta)
    if step % 5 == 0:
        print(f"Step {step} | theta = {theta:.3f} | loss = {loss(theta):.4f}")

```


```
$
0.9553364891256059
Step 0 | theta = 0.000 | loss = 0.0000
Step 5 | theta = 0.000 | loss = 0.0000
Step 10 | theta = 0.000 | loss = 0.0000
Step 15 | theta = 0.000 | loss = 0.0000
Step 20 | theta = 0.000 | loss = 0.0000
Step 25 | theta = 0.000 | loss = 0.0000
```

🧠 What this means physically

- theta = trainable parameter
- Circuit prepares a quantum state
- Measurement returns ⟨Z⟩ expectation
- This is your model output

This is exactly like a neuron:

  input → weight → activation


Every QML model is just:

  [VQC] + [Classical Optimizer]



#### Now let us build a quantum neuron

The VQC now extended to behave like a *quantum neuron*


  x  →  encode(x)  →  trainable circuit  →  output



```
import pennylane as qml
from pennylane import numpy as np

dev = qml.device("default.qubit", wires=1)

@qml.qnode(dev)
def vqc(x, theta):
    # 1️⃣ Encode classical input
    qml.RY(x, wires=0)

    # 2️⃣ Trainable rotation
    qml.RY(theta, wires=0)

    # 3️⃣ Readout
    return qml.expval(qml.PauliZ(0))

x = 0.5        # classical input feature
theta = 0.3   # trainable parameter

print(vqc(x, theta))

def loss(theta, x):
    return (vqc(x, theta) - 1.0) ** 2


opt = qml.GradientDescentOptimizer(stepsize=0.1)
theta = np.array(0.0, requires_grad=True)

x = 0.8  # fixed training input

for step in range(30):
    theta = opt.step(lambda t: loss(t, x), theta)

    if step % 5 == 0:
        print(
            f"Step {step} | "
            f"theta = {theta:.3f} | "
            f"output = {vqc(x, theta):.4f}"
        )

```



```
0.6967067093471653
Step 0 | theta = -0.044 | output = 0.7273
Step 5 | theta = -0.191 | output = 0.8200
Step 10 | theta = -0.277 | output = 0.8664
Step 15 | theta = -0.335 | output = 0.8939
Step 20 | theta = -0.378 | output = 0.9122
Step 25 | theta = -0.411 | output = 0.9251
```


#### Now let us add a quantumn entanglement node

![](/images/QUANTUM_COMPUTING/quantum_gates.png)

Let us go from 

  |0⟩ ── RY(x) ── RY(θ) ── ⟨Z⟩


To 


  |0⟩ ── RY(x₁) ──●── RY(θ₁) ── ⟨Z⟩
                │
  |0⟩ ── RY(x₂) ──X── RY(θ₂) ── ⟨Z⟩


So that we achieve 

  ✔ Correlated features
  ✔ Non-linear decision boundaries
  ✔ True quantum behavior



Probably confusing , my mind is stil tuned to the classical way of thinking , so let us take a analogy 


  x1 = distance
  x2 = relative speed
  risk = f(x1) + f(x2)

The risk in a real world driving would be a combination of distance AND speed together 

  risk ≠ f(x1) + f(x2)
  risk = f(x1, x2)


So without entanglement 

  Qubit 0 depends only on x1
  Qubit 1 depends only on x2


With entanglement

  Qubit 0 state depends on x1 AND x2
  Qubit 1 state depends on x1 AND x2


```
import pennylane as qml
from pennylane import numpy as np

dev = qml.device("default.qubit", wires=2)

@qml.qnode(dev)
def entangled_vqc(x, theta):
    # x: 2-dim classical input
    # theta: 2 trainable params

    # 1️⃣ Encode classical features
    qml.RY(x[0], wires=0)
    qml.RY(x[1], wires=1)

    # 2️⃣ Entanglement
    qml.CNOT(wires=[0, 1])

    # 3️⃣ Trainable rotations
    qml.RY(theta[0], wires=0)
    qml.RY(theta[1], wires=1)

    # 4️⃣ Readout
    return (
        qml.expval(qml.PauliZ(0)),
        qml.expval(qml.PauliZ(1))
    )


x = np.array([0.6, 0.2])
theta = np.array([0.1, 0.1])

print(entangled_vqc(x, theta))


def loss(theta, x):
    z0, z1 = entangled_vqc(x, theta)
    return (z0 - 1.0) ** 2 + (z1 - 1.0) ** 2


opt = qml.GradientDescentOptimizer(stepsize=0.1)
theta = np.array([0.0, 0.0], requires_grad=True)

x = np.array([0.8, 0.3])

for step in range(30):
    theta = opt.step(lambda t: loss(t, x), theta)

    if step % 5 == 0:
        z0, z1 = entangled_vqc(x, theta)
        print(
            f"Step {step} | "
            f"theta = {theta} | "
            f"Z = ({z0:.3f}, {z1:.3f})"
        )

```
![](/images/QUANTUM_COMPUTING/training_loss.png)


```
Step 0 | theta = [-0.01285922 -0.01976502] | Z = (0.699, 0.671)
Step 5 | theta = [-0.06818813 -0.10245817] | Z = (0.710, 0.692)
Step 10 | theta = [-0.1116638  -0.16518783] | Z = (0.716, 0.705)
Step 15 | theta = [-0.14628707 -0.21403244] | Z = (0.720, 0.713)
Step 20 | theta = [-0.17410229 -0.25270375] | Z = (0.723, 0.718)
Step 25 | theta = [-0.1965766  -0.28365224] | Z = (0.725, 0.722)
```

![](/images/QUANTUM_COMPUTING/entanglement_output.png)




## End-to-End Quantum Machine Learning Architecture
![QML Architecture](/images/QUANTUM_COMPUTING/Quantum_Machine_complete_Architecture.png)
