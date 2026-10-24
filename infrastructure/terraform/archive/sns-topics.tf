resource "aws_sns_topic" "breytiomn_alerts" {
  name = "breytiomn-alerts"
}

resource "aws_sns_topic_subscription" "breytiomn_email" {
  topic_arn = aws_sns_topic.breytiomn_alerts.arn
  protocol  = "email"
  endpoint  = "ops@breytiomn.io"
}
