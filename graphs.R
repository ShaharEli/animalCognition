library(ggplot2)
library(readr)
df <- read_csv("data/output.csv")
plot1 = ggplot(df, aes(x = Generation, y = (`Aggressive Amount` + `Friendly Amount`) , color = factor(`Aggressive Ratio`))) +
  stat_summary(fun = mean, geom = "line") +
  labs(title = "Mean population size over generations",
       x = "Generation",
       y = "Mean population size",
       color = "Aggressive Ratio") +
  theme_minimal()
plot1

plot2 = ggplot(df, aes(x = Generation, y = (`Aggressive Amount` + `Friendly Amount`) , color = factor(`Aggressive Ratio`))) +
  stat_summary(fun = mean, geom = "line") +xlim(0,100) +
  labs(title = "Mean population size over 100 generations",
       x = "Generation",
       y = "Mean population size",
       color = "Aggressive Ratio") +
  theme_minimal()
plot2

plot3 = ggplot(df, aes(x = Generation, y = (`Aggressive Amount` + `Friendly Amount`) , color = factor(`Aggressive Ratio`))) +
  stat_summary(fun = mean, geom = "line") +xlim(0,25) +
  labs(title = "Mean population size over 25 generations",
       x = "Generation",
       y = "Mean population size",
       color = "Aggressive Ratio") +
  theme_minimal()
plot3


plot4=ggplot(df, aes(x = Generation, y = `Aggressive Amount`, color = factor(`Aggressive Ratio`))) +
  stat_summary(fun = mean, geom = "line") +
  labs(title = "Mean aggressive amount over generations",
       x = "Generation",
       y = "Mean aggressive amount",
       color = "Aggressive Ratio") +
  theme_minimal()
plot4


plot5=ggplot(df, aes(x = Generation, y = `Friendly Amount`, color = factor(`Aggressive Ratio`))) +
  stat_summary(fun = mean, geom = "line") +
  labs(title = "Mean friendly amount over generations",
       x = "Generation",
       y = "Mean friendly amount",
       color = "Aggressive Ratio") +
  theme_minimal()
plot5

