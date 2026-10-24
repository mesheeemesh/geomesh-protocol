resource "aws_internet_gateway" "breytiomn" {
  vpc_id = aws_vpc.breytiomn.id
  tags   = { Name = "breytiomn-igw" }
}

resource "aws_eip" "nat" {
  domain = "vpc"
}

resource "aws_nat_gateway" "breytiomn" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public_a.id
  tags          = { Name = "breytiomn-nat" }
  depends_on    = [aws_internet_gateway.breytiomn]
}
