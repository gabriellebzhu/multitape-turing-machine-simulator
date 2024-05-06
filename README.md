# Multitape Turing Machine Simulator

The Turing Machine is a model of computation that, due to its (relatively) simple rules and constraints, is a useful tool for exploring and proving theories in computer science.

##  2. <a name='Background'></a>Background

###  2.1. <a name='Motivation'></a>Motivation

From a very high-level perspective, Turing Machines take in strings and determines whether those strings are accepted or rejected. 

If we think of every problem we encounter in computer science as a string (addition, for instance, is represented as "x+y=z"), then we begin to see how a model that takes in strings as input and pumps out a boolean as an output could be useful.

In fact, the Turing Machine can be used to prove some really fundamental ideas about what problems are realistically solvable, and which are not (see: [Church-Turing thesis](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis)). Thus, understanding this model (and variations thereof) can be pretty useful in exploring the limits of what our computers can actually do for us. 

The multitape Turing Machine is a variation of the single-tape machine. As I'll later discuss, the multitape variation is actually functionally equivalent to the single tape variation. 

> __Important__: This tool is intended to demonstrate/visualize how multitape Turing Machines operate.
> 
> Future plans include adding a feature to translate a multitape machine into a single tape one to highlight that Turing machines are essentially the same as even the "more powerful" computational models.

###  2.2. <a name='WhatactuallyisaTuringMachine'></a>What (actually) is a Turing Machine?

A Turing Machine is composed of 
- A single tape: the input
- An input alphabet $\Sigma$: all the possible symbols that can be present in the tape (e.g. all ASCII characters)
- A tape alphabet $`\Gamma = \Sigma \cup \{ \_ \}`$: the input alphabet plus an auxillary symbol "_" representing a blank space.
- A set of states $Q$
- An initial state $Q_0 \in Q$
- A set of final states $F \subseteq Q$: if we end up in one of these states, then we accept the string
- A set of instructions $\delta: Q\times\Gamma\to Q\times\Gamma\times\{L,R,*\}$: transitions from one state to another upon seeing different symbols from the tape alphabet, including what direction the head should move in afterwards (L = left, R = right, * = stay).

When we give this machine a tape, it reads the first symbol from the tape, $x_0\in\Sigma$. It then finds the instruction corresponding to $Q_0$ and $x_0$, which will tell it 3 pieces of information:
1. The new state that replaces $Q_0$ (must be an element from the set of states, $Q$)
2. The new symbol that replaces the current, $x_i\in\Gamma$
3. The direction the machine should look to for the next symbol on the tape (one of left, right, or stay). For convenience, we model the position that the machine is reading from as a pointer or the "head".

The machine will continue in this fashion until it reaches a halting state or finds that it is missing an instruction.

In practice, instructions are typically written in the following format:
``` plaintext
starting_state current_symbol_on_tape replacement_symbol move_direction new_state

Example:
start a b * new_state  // if we are in the "start" state and see an "a",
                       // then change the "a" to a "b", stay in the same
                       // position, and update the state to "new_state"
```

A simulation of this model can be created using this tool (see [Usage](#usage) for instructions) or at [Turing Machine Simulator](https://morphett.info/turing/turing.html).

###  2.3. <a name='MultitapeTuringMachine'></a>Multitape Turing Machine

A multitape Turing Machine is a variation on this. Instead of the singular tape, we have several. Each tape has its own string and pointer to a position in that string.

At any given point, as we are running a multitape machine, it reads the symbol at the pointer in each tape, and tries to find an instruction that corresponds to it. That instruction includes the current state, a symbol to read for every tape, a symbol to write for every tape, a direction to move for every tape, and the new state that this results in.

The formal definition of the machine is very similar to that of the single tape machine. Assuming that there are a total of $k$ tapes, then we would have the following changes:
- The instructions $\delta: Q\times\Gamma^k \to Q\times\Gamma^k\times\{L,R,*\}^k$: transitions from one state to another upon seeing different symbols from the tape alphabet, including what direction the head should move in afterwards (L = left, R = right, * = stay).

Here, because we have $k$ tapes instead of only 1, our instructions must accomodate all the additional information we need about each of $k$ tapes.

Practically, instructions look like this:
```
starting_state current_symbol_1 current_symbol_2 ... current_symbol_k replacement_symbol_1 replacement_symbol_2 ... replacement_symbol_k move_direction_1 move_direction_2 ...move_direction_k new_state
```
It's a _bit_ messier, that is for certain.

##  3. <a name='Usage'></a>Usage

### Web Application

To use this application, you can visit <>

### Running Locally

If you would prefer to run and serve the application locally, then here are the (easiest) steps that you would need to take.

1. Fork this repository.
2. [Install `nvm`](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating), [install `Node.js` and `npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (the package manager used in this project) and any other dependencies that they may need.
3. In your local copy of the repository, run `npm i`
4. Run `npm start`. 
(Note that the default port for this project is `8001`. To change this, update the `devServer.port` key in [`webpack.config.js`](./webpack.config.js) to your desired port.)


### Running Tests

This project uses [Jasmine](https://jasmine.github.io/). To run all all tests:

- `npm run test`: builds and runs tests in the terminal
- `npm run test:serve`: runs tests, watches for changes, and serves results to port `8888`

## Contributing

Details on future work and contributions to follow
