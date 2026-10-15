{{/*
Expand the name of the chart.
*/}}
{{- define "breytiomn.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "breytiomn.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "breytiomn.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "breytiomn.labels" -}}
helm.sh/chart: {{ include "breytiomn.chart" . }}
{{ include "breytiomn.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "breytiomn.selectorLabels" -}}
app.kubernetes.io/name: {{ include "breytiomn.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Component-specific selector labels
*/}}
{{- define "breytiomn.componentSelectorLabels" -}}
app.kubernetes.io/name: {{ include "breytiomn.name" .root }}
app.kubernetes.io/instance: {{ .root.Release.Name }}
app.kubernetes.io/component: {{ .component }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "breytiomn.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "breytiomn.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Create the name of the backend secret to use
*/}}
{{- define "breytiomn.backendSecretName" -}}
{{- if .Values.backend.existingSecret }}
{{- .Values.backend.existingSecret }}
{{- else }}
{{- printf "%s-backend" (include "breytiomn.fullname" .) }}
{{- end }}
{{- end }}

{{/*
Create the postgresql host name
*/}}
{{- define "breytiomn.postgresHost" -}}
{{- if .Values.postgresql.enabled }}
{{- printf "%s-postgresql" (include "breytiomn.fullname" .) }}
{{- else }}
{{- default "localhost" .Values.backend.env.DATABASE_HOST }}
{{- end }}
{{- end }}

