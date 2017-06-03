# Sebastian's Project: A Replication of Culbertson and Adger (2014)

## Links

Data visualization: https://nlp.stanford.edu/~sebschu/experiments/visualize.html

Experiment:
- Condition 1: https://nlp.stanford.edu/~sebschu/experiments/0_word_order/experiment-cond1.html
- Condition 2: https://nlp.stanford.edu/~sebschu/experiments/0_word_order/experiment-cond2.html
- Condition 3: https://nlp.stanford.edu/~sebschu/experiments/0_word_order/experiment-cond3.html

## Motivation for the Study

The main motivation behind the study is the old nature vs. nurture debate in language acquisition. Do language learners make use of some pre-defined structures or do the solely learn from surface sequences? The authors try to address this question by investigating the preferences in learning the order of nominal modifiers. They base their study on Greenberg's Universal 20, which says that in languages with pre-nominal modifiers, the relative order of demonstratives, numerals, and adjectives is always the same, namely Dem-Num-Adj-Nom. In languages with post-nominal modifiers, the order is either Nom-Dem-Num-Adj (rare) or Nom-Adj-Num-Dem (more frequent). They argue that the orders Dem-Num-Adj-Nom and Nom-Adj-Num-Dem are most common because these orders are isomorphic to the semantic scope of the various modifiers. In their experiment, they want to address the question whether language learners prefer these isomorphic word orders for post-nominal modifiers or instead the word order that they are most familiar with, namely the English word order.

## Hypotheses

H1: Language learners make use of structural knowledge when they make inferences about the word order of a language that they don't know.

H2: Language learners use statistical knowledge of word chunks when they make inferences about the word order of a language that they don't know.

# Proposed Methodology / Design with Example Stimuli

**Training phase**:

Participants on Mechanical Turk are exposed to 30 noun-modifier pairs (depending on  the condition, either 15x N-Adj and 15x N-Dem, 15x N-Num and 15x N-Dem, or 15x N-Adj and 15x N-Num). In each trial, participants see an English phrase (e.g., "this vase") and hear a "translation" with a different word order (in this case "vase green"). Participants have to click on a button indicating what they have heard.



**Test phase**:

Participants see an English phrase and they are supposed to select a "translation". For each participant, there are 20 single modifier trials with the same types as during training (10 per modifier type), and 30 double modifier trials (10 for each modifier combination). In the single modifier trials, participants have to choose between N-Mod and Mod-N. In the double modifier trials, participants have to choose between N-Mod2-Mod1 (scope-isomorphic), N-Mod1-Mod2 (same modifier order as in English), Mod2-Mod1-N and Mod1-Mod2-N (pre-nominal modifiers as distractors.)

# Predictions

According to H1, participants should choose the scope-isomorphic orders more often than the English modifier order in the double modifier trials because they make use of structural knowledge.

According to H2, participants should choose the English modifier order more often than the scope-isomorphic order in the double modifier trials because they were exposed to the English order more often and extrapolate from statistical knowledge.
