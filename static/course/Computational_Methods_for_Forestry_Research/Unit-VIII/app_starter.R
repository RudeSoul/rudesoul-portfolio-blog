# Unit 8 Practice Starter: R Shiny Biomass Dashboard
# Practice script for lab exercises. Fill in the commented sections.

library(shiny)
library(ggplot2)

ui <- fluidPage(
  titlePanel("Bagmati Forest Observatory — Biomass Decision Tool"),
  sidebarLayout(
    sidebarPanel(
      selectInput(
        "species",
        "Select Tree Species:",
        choices = c("Shorea robusta", "Schima wallichii", "Castanopsis indica", "Alnus nepalensis")
      ),
      numericInput("dbh", "Diameter at Breast Height, DBH (cm):", value = 28.4, min = 1, max = 300, step = 0.5),
      hr(),
      helpText("Model Calibration Range: 10 to 80 cm DBH.")
    ),
    mainPanel(
      uiOutput("domain_warning"),
      h3(textOutput("predicted_agb")),
      plotOutput("curve_plot", height = "380px")
    )
  )
)

server <- function(input, output) {
  calc_agb <- function(d) 0.085 * (d ^ 2.42) * 1.0072

  # Active domain guard: check if DBH is outside calibrated range (10-80 cm)
  output$domain_warning <- renderUI({
    if (is.na(input$dbh) || input$dbh <= 0) {
      div(style = "color: white; background-color: #c0392b; padding: 10px; border-radius: 5px;",
          strong("Error: "), "DBH must be greater than 0.")
    } else if (input$dbh < 10 || input$dbh > 80) {
      div(style = "color: #856404; background-color: #fff3cd; padding: 10px; border-radius: 5px;",
          strong("Domain Alert: "), "DBH is outside calibrated range (10–80 cm).")
    } else {
      div(style = "color: #155724; background-color: #d4edda; padding: 10px; border-radius: 5px;",
          strong("Status: "), "Within calibrated empirical domain.")
    }
  })

  output$predicted_agb <- renderText({
    req(input$dbh > 0)
    sprintf("Estimated Biomass (%s): %.2f kg", input$species, calc_agb(input$dbh))
  })

  output$curve_plot <- renderPlot({
    req(input$dbh > 0)
    d_seq <- seq(5, 95, length.out = 100)
    df_curve <- data.frame(DBH_cm = d_seq, AGB_kg = calc_agb(d_seq))

    ggplot(df_curve, aes(x = DBH_cm, y = AGB_kg)) +
      geom_line(color = "#1f618d", linewidth = 1.2) +
      geom_vline(xintercept = c(10, 80), linetype = "dashed", color = "grey50") +
      geom_point(aes(x = input$dbh, y = calc_agb(input$dbh)), color = "#c0392b", size = 4) +
      labs(title = "Allometric Curve (10–80 cm domain)", x = "DBH (cm)", y = "Biomass (kg)") +
      theme_bw(base_size = 13)
  })
}

shinyApp(ui = ui, server = server)

