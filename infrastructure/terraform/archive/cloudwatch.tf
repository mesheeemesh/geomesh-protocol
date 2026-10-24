resource "aws_cloudwatch_log_group" "breytiomn" {
  name              = "/breytiomn/app"
  retention_in_days = 30
}

resource "aws_cloudwatch_dashboard" "breytiomn" {
  dashboard_name = "breytiomn-dashboard"
  dashboard_body = jsonencode({
    widgets = [
      {
        type = "metric"
        properties = {
          title   = "CPU Utilization"
          metrics = [["AWS/ECS", "CPUUtilization", "ServiceName", "breytiomn"]]
          period  = 300
          stat    = "Average"
        }
      }
    ]
  })
}
