resource "aws_route53_health_check" "breytiomn_api" {
  fqdn              = "api.breytiomn.io"
  port              = 443
  type              = "HTTPS"
  resource_path     = "/health"
  failure_threshold = 3
  request_interval  = 30
}
