library(ggplot2)
library(readr)
df <- read_csv("data/output.csv")

total_mean = mean(df$`Aggressive Amount` + df$`Friendly Amount`)
agg_mean = mean(df$`Aggressive Amount`)
friendly_mean = mean(df$`Friendly Amount`)

plot1 = ggplot(df, aes(x = Generation, y = (`Aggressive Amount` + `Friendly Amount`) , color = factor(`Aggressive Ratio`))) +
  stat_summary(fun = mean, geom = "line") +
  geom_hline(yintercept = total_mean, linetype="dotted") +
  annotate("text", x = max(df$Generation), y = total_mean, label = round(total_mean, 2), hjust = 1.5) +
  labs(title = "Mean population size over generations",
       x = "Generation",
       y = "Mean population size",
       color = "Aggressive Ratio") +
  theme_minimal()
plot1

# The same structure follows for plot2 and plot3

plot4=ggplot(df, aes(x = Generation, y = `Aggressive Amount`, color = factor(`Aggressive Ratio`))) +
  stat_summary(fun = mean, geom = "line") +
  geom_hline(yintercept = agg_mean, linetype="dotted") +
  annotate("text", x = max(df$Generation), y = agg_mean, label = round(agg_mean, 2), hjust = 1.5) +
  labs(title = "Mean aggressive amount over generations",
       x = "Generation",
       y = "Mean aggressive amount",
       color = "Aggressive Ratio") +
  theme_minimal()
plot4

plot5=ggplot(df, aes(x = Generation, y = `Friendly Amount`, color = factor(`Aggressive Ratio`))) +
  stat_summary(fun = mean, geom = "line") +
  geom_hline(yintercept = friendly_mean, linetype="dotted") +
  annotate("text", x = max(df$Generation), y = friendly_mean, label = round(friendly_mean, 2), hjust = 1.5) +
  labs(title = "Mean friendly amount over generations",
       x = "Generation",
       y = "Mean friendly amount",
       color = "Aggressive Ratio") +
  theme_minimal()
plot5
