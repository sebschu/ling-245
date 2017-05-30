# merge data


setwd("~/Dropbox/Uni/2017S/LINGUIST245/replication/data/")
library(dplyr)

strreverse <- function(x){ x = toString(x); strsplit(x, " ") %>% lapply(rev) %>% sapply(paste, collapse=" ") }

is_postnominal <- function(row) { response = toString(row[9]); noun = toString(row[4]); parts = unlist(strsplit(response, " ")); return(noun == parts[1])}

#combine files from condition 1
data.cond1.pilot <- read.csv("word-order-cond1-pilot-trials.csv")
data.cond1.rest <- read.csv("word-order-cond1-trials.csv")

data.cond1.rest$workerid <- data.cond1.rest$workerid + 2

data.cond1 <- rbind(data.cond1.pilot, data.cond1.rest)
data.cond1$condition = 1

#combine files from condition 2

data.cond2.1 <- read.csv("word-order-cond2-trials.csv.1")
data.cond2.2 <- read.csv("word-order-cond2-trials.csv.2")
data.cond2.3 <- read.csv("word-order-cond2-trials.csv.3")
data.cond2.4 <- read.csv("word-order-cond2-trials.csv.4")

data.cond2.1$workerid <- data.cond2.1$workerid + 32
data.cond2.2$workerid <- data.cond2.2$workerid + 42
data.cond2.3$workerid <- data.cond2.3$workerid + 52
data.cond2.4$workerid <- data.cond2.4$workerid + 61

data.cond2 <- rbind(data.cond2.1, data.cond2.2, data.cond2.3, data.cond2.4)

data.cond2$condition = 2


data.cond3 <- read.csv("word-order-cond3-trials.csv")
data.cond3$workerid <- data.cond3$workerid + 64
data.cond3$condition = 3

data <- rbind(data.cond1, data.cond2, data.cond3)

data$expected_response <- unlist(lapply(data$stimulus, strreverse))

data$correct <- data$expected_response == data$response
data$post_nominal <- apply(data, 1, is_postnominal)

data[is.na(data$modifier1), ]$train = TRUE
data[is.na(data$modifier), ]$train = FALSE
data$train = as.logical(data$train)


write.csv(data, "data-combined.csv")
