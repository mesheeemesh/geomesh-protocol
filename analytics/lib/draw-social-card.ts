import type { Template, Metric } from '@/lib/social-card-templates';

export function drawCard(
  canvas: HTMLCanvasElement,
  template: Template,
  metric: Metric,
) {
  const { width, height } = template;
  canvas.width  = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d')!;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#4f46e5');
  grad.addColorStop(1, '#7c3aed');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Subtle grid overlay
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 60) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y < height; y += 60) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }

  // Header bar
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, 90);

  // Logo circle
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(60, 45, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#4f46e5';
  ctx.font = 'bold 22px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('VC', 60, 45);

  // Brand name
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${Math.round(width * 0.028)}px Arial`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('geomesh-protocol Analytics', 100, 45);

  // Template label (top-right)
  ctx.font = `${Math.round(width * 0.018)}px Arial`;
  ctx.textAlign = 'right';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillText(template.label, width - 30, 45);

  // Main metric value
  const centerY = height * 0.48;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${Math.round(width * 0.12)}px Arial`;
  ctx.textBaseline = 'middle';
  ctx.fillText(metric.value, width / 2, centerY);

  // Metric label
  ctx.font = `${Math.round(width * 0.032)}px Arial`;
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillText(metric.label, width / 2, centerY + Math.round(width * 0.09));

  // Mini bar chart thumbnail
  const barData = [65, 80, 55, 90, 70, 85, 95];
  const barW = Math.round(width * 0.06);
  const barGap = Math.round(width * 0.015);
  const maxBarH = Math.round(height * 0.12);
  const chartX = width / 2 - ((barW + barGap) * barData.length) / 2;
  const chartY = height - Math.round(height * 0.22);
  barData.forEach((val, i) => {
    const bh = Math.round((val / 100) * maxBarH);
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.beginPath();
    (ctx as CanvasRenderingContext2D & { roundRect?: (...a: unknown[]) => void }).roundRect?.(
      chartX + i * (barW + barGap), chartY - bh, barW, bh, 4,
    ) ?? ctx.fillRect(chartX + i * (barW + barGap), chartY - bh, barW, bh);
    ctx.fill();
  });

  // Footer
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, height - 54, width, 54);
  ctx.font = `${Math.round(width * 0.022)}px Arial`;
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Powered by geomesh-protocol Analytics', width / 2, height - 27);
}
