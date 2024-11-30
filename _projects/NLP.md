---
layout: page
title: Text Processing
description: Different NLP and text processing techniques 
img: assets/blog/NLP/image.png
importance: 1
category: AIML
related_publications: 
---

## Word to Vec techniques

    - Continuous Bag of Words (CBOW)
    - Skip-gram (SKI gram) word embedding models on the preprocessed data.





<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/blog/NLP/CBOW.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>



## LSTM

RNNs are neural networks designed for sequential data, where each neuron has connections to subsequent layers and to neurons within the same layer.

LSTMs are a type of RNN designed to learn long-term dependencies and retain information over longer sequences.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/blog/NLP/LSTM.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/blog/NLP/comparison_DL_networks.webp" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


Architecture:

    RNN: Simple recurrent connections, prone to vanishing gradient problems.
    LSTM: Complex architecture with memory cells and three types of gates, designed to capture long-term dependencies.
    GRU: Simplified version of LSTM with two gates, combining memory cell and hidden state.

Learning Capabilities:

    RNN: Good for short-term dependencies.
    LSTM: Superior for long-term dependencies and handling complex sequences.
    GRU: Balances complexity and performance, often as effective as LSTMs but with faster training times.

Training Complexity:

    RNN: Easier to implement but struggles with long-term dependencies.
    LSTM: More complex and computationally intensive, requires careful tuning.
    GRU: Simpler than LSTM, faster to train, and often achieves similar performance.

## Transformers

Attention Is All You Need



<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/blog/NLP/Transformer_Model_architecture.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/blog/NLP/attention_is_all_you_need.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


## BeRT

Bidirectional Encoder Representations from Transformers

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/blog/Image_classification/image.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


