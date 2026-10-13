# Analytics API Reference

## Base URLhttps://api.geomesh-protocol.io/v1/analytics
## Authentication
All API requests require a Bearer token in the header:
Authorization: Bearer YOUR_API_TOKEN
## Endpoints

### Get Dashboard OverviewGET /dashboard
**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| start_date | string | Yes | Start date (YYYY-MM-DD) |
| end_date | string | Yes | End date (YYYY-MM-DD) |

**Response:**
```json
{
  "total_views": 1200,
  "total_engagement": 450,
  "growth_rate": 12.5,
  "top_content": []
}
```

---

### Get Content Analytics
GET /content/:id
**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Content ID |

**Response:**
```json
{
  "content_id": "abc123",
  "views": 500,
  "likes": 120,
  "shares": 45,
  "engagement_rate": 24.0
}
```

---

### Get Audience Insights
GET /audience
**Response:**
```json
{
  "total_followers": 3000,
  "demographics": {},
  "top_locations": [],
  "devices": {}
}
```

---

## Error Codes
| Code | Description |
|------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |
