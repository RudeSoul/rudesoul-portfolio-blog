# Unit 8: R Shiny Interactive Biomass Estimator
# Decision-support dashboard with scientific domain boundary guards
# Run in RStudio: shiny::runApp("app.R")

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
      helpText("Model Calibration Range: 10 to 80 cm DBH."),
      helpText("Formula: Bias-corrected power law (Unit V).")
    ),
    mainPanel(
      uiOutput("domain_warning"),
      h3(textOutput("predicted_agb")),
      plotOutput("curve_plot", height = "380px")
    )
  )
)

server <- function(input, output) {
  # Calibrated power-law allometry: AGB (kg) = 0.085 * DBH^2.42 * 1.0072
  calc_agb <- function(d) 0.085 * (d ^ 2.42) * 1.0072

  output$domain_warning <- renderUI({
    if (is.na(input$dbh) || input$dbh <= 0) {
      div(
        style = "color: white; background-color: #c0392b; padding: 12px; border-radius: 6px; margin-bottom: 15px;",
        strong("Input Error: "), "DBH must be a positive number greater than 0 cm."
      )
    } else if (input$dbh < 10 || input$dbh > 80) {
      div(
        style = "color: #856404; background-color: #fff3cd; padding: 12px; border: 1px solid #ffeeba; border-radius: 6px; margin-bottom: 15px;",
        strong("Scientific Domain Alert: "),
        sprintf("DBH (%.1f cm) is outside the calibrated range (10–80 cm). Extrapolations carry substantial uncertainty.", input$dbh)
      )
    } else {
      div(
        style = "color: #155724; background-color: #d4edda; padding: 10px; border-radius: 6px; margin-bottom: 15px;",
        strong("Status: "), "Input is within the validated empirical domain (10–80 cm)."
      )
    }
  })

  output$predicted_agb <- renderText({
    req(input$dbh > 0)
    sprintf("Estimated Biomass (%s): %.2f kg", input$species, calc_agb(input$dbh))
  })

  output$curve_plot <- renderPlot({
    req(input$dbh > 0)
    d_seq <- seq(5, 95, length.out = 150)
    df_curve <- data.frame(DBH_cm = d_seq, AGB_kg = calc_agb(d_seq))

    ggplot(df_curve, aes(x = DBH_cm, y = AGB_kg)) +
      geom_line(color = "#1f618d", linewidth = 1.2) +
      geom_vline(xintercept = c(10, 80), linetype = "dashed", color = "grey50") +
      annotate("rect", xmin = 10, xmax = 80, ymin = 0, ymax = Inf, alpha = 0.08, fill = "forestgreen") +
      geom_point(aes(x = input$dbh, y = calc_agb(input$dbh)), color = "#c0392b", size = 4.5) +
      labs(
        title = "Allometric Biomass Trajectory (Empirical Domain: 10–80 cm)",
        x = "Diameter at Breast Height, DBH (cm)",
        y = "Above-Ground Biomass (kg)"
      ) +
      theme_bw(base_size = 13)
  })
}

shinyApp(ui = ui, server = server)

