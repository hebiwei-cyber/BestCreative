/* BestCreative Ops Admin prototype */
(() => {
  const OPERATOR = 'ops.admin@bestfulfill.com';
  const PAGE_TITLES = { overview: '运营概览', customers: '客户管理', logs: '变更记录' };

  const state = {
    page: 'overview',
    datePreset: 7,
    customStart: null,
    customEnd: null,
    customerQuery: '',
    customerStatus: 'all',
    customerSource: 'all',
    customerSort: { key: 'updatedAt', dir: 'desc' },
    logQuery: '',
    drawerId: null,
    drawerTab: 'behavior',
    behaviorRange: 'today',
    adjustId: null,
  };

  const customers = [
    {
      id: 'BC10086',
      name: 'Northstar Studio',
      email: 'hello@northstar.io',
      creditsLifetime: 4860,
      credits: 1280,
      source: 'Google',
      sourceRaw: 'utm_source=google&utm_medium=cpc&utm_campaign=bc_launch',
      status: 'active',
      createdAt: '2026-10-12 09:18',
      updatedAt: '2026-11-11 07:22',
      lastLogin: '2026-11-11 06:42',
      website: 'northstar.io',
      note: '重点跟进 · 视频克隆需求强',
    },
    {
      id: 'BC10092',
      name: 'Bloom Retail',
      email: 'ops@bloom.shop',
      creditsLifetime: 920,
      credits: 86,
      source: 'Social',
      sourceRaw: 'utm_source=instagram&utm_medium=social',
      status: 'active',
      createdAt: '2026-10-28 14:05',
      updatedAt: '2026-11-10 21:28',
      lastLogin: '2026-11-10 21:16',
      website: 'bloom.shop',
      note: '',
    },
    {
      id: 'BC10105',
      name: 'PixelForge',
      email: 'team@pixelforge.ai',
      creditsLifetime: 9100,
      credits: 2400,
      source: '运营开通',
      sourceRaw: '',
      status: 'active',
      createdAt: '2026-09-03 11:22',
      updatedAt: '2026-11-11 02:40',
      lastLogin: '2026-11-11 02:08',
      website: 'pixelforge.ai',
      note: '商务渠道导入',
    },
    {
      id: 'BC10118',
      name: 'Harbor Brands',
      email: 'creative@harbor.co',
      creditsLifetime: 1500,
      credits: 0,
      source: 'Referral',
      sourceRaw: 'ref=partner_acme',
      status: 'active',
      createdAt: '2026-11-02 16:40',
      updatedAt: '2026-11-08 10:12',
      lastLogin: '2026-11-08 10:01',
      website: 'harbor.co',
      note: '积分已用尽',
    },
    {
      id: 'BC10124',
      name: 'Quiet Label',
      email: 'me@quietlabel.com',
      creditsLifetime: 860,
      credits: 420,
      source: 'Direct',
      sourceRaw: '',
      status: 'disabled',
      createdAt: '2026-08-19 08:55',
      updatedAt: '2026-10-15 09:22',
      lastLogin: '2026-10-01 19:33',
      website: 'quietlabel.com',
      note: '主动停用',
    },
    {
      id: 'BC10131',
      name: 'Orbit DTC',
      email: 'growth@orbitdtc.com',
      creditsLifetime: 2100,
      credits: 650,
      source: 'Other',
      sourceRaw: 'utm_source=newsletter',
      status: 'active',
      createdAt: '2026-11-06 13:12',
      updatedAt: '2026-11-11 06:28',
      lastLogin: '2026-11-11 05:55',
      website: 'orbitdtc.com',
      note: '',
    },
  ];

  const behaviors = {
    BC10086: [
      { time: '06:42', type: '登录成功', summary: '密码登录成功', result: 'success' },
      { time: '06:45', type: '进入画布', summary: '打开项目「Holiday Drop」', result: 'success' },
      { time: '06:51', type: '从 Radar 选用素材', summary: '选中创意 RD-8821', result: 'success' },
      { time: '07:03', type: '创建任务', summary: 'Video Clone · Winter Lookbook', result: 'success', ref: 'T-9021' },
      { time: '07:18', type: '任务完成', summary: 'Video Clone · Winter Lookbook', result: 'success', ref: 'T-9021' },
      { time: '07:22', type: '创建任务', summary: 'Product to Video · SKU-A12', result: 'success', ref: 'T-9028' },
    ],
    BC10092: [
      { time: '昨日 21:16', type: '登录成功', summary: '密码登录成功', result: 'success' },
      { time: '昨日 21:20', type: '上传素材', summary: 'Local 上传 3 张产品图', result: 'success' },
      { time: '昨日 21:28', type: '创建任务', summary: 'Image Editing · Clean BG', result: 'fail', ref: 'T-8890' },
    ],
    BC10105: [
      { time: '02:08', type: '登录成功', summary: '密码登录成功', result: 'success' },
      { time: '02:15', type: '创建任务', summary: 'Image Generation · Packshot', result: 'success', ref: 'T-9102' },
      { time: '02:40', type: '任务完成', summary: 'Image Generation · Packshot', result: 'success', ref: 'T-9102' },
    ],
    BC10118: [
      { time: '11-08 10:01', type: '登录成功', summary: '密码登录成功', result: 'success' },
      { time: '11-08 10:12', type: '创建任务', summary: 'Product to Video · 因积分不足失败', result: 'fail', ref: 'T-8755' },
    ],
    BC10124: [],
    BC10131: [
      { time: '05:55', type: '登录成功', summary: '密码登录成功', result: 'success' },
      { time: '06:10', type: '进入画布', summary: '打开项目「Orbit Launch」', result: 'success' },
      { time: '06:28', type: '创建任务', summary: 'Video Clone · UGC Style', result: 'success', ref: 'T-9110' },
    ],
  };

  const tasks = {
    BC10086: [
      { id: 'T-9028', name: 'SKU-A12 Launch', type: 'Product to Video', status: 'Running', user: 'hello@northstar.io', credits: 40, createdAt: '2026-11-11 07:22' },
      { id: 'T-9021', name: 'Winter Lookbook', type: 'Video Clone', status: 'Success', user: 'hello@northstar.io', credits: 60, createdAt: '2026-11-11 07:03' },
      { id: 'T-8910', name: 'Hero Still Edit', type: 'Image Editing', status: 'Success', user: 'hello@northstar.io', credits: 12, createdAt: '2026-11-10 15:40' },
      { id: 'T-8802', name: 'Pack Flatlay', type: 'Image Generation', status: 'Success', user: 'editor@northstar.io', credits: 18, createdAt: '2026-11-09 11:05' },
    ],
    BC10092: [
      { id: 'T-8890', name: 'Clean BG', type: 'Image Editing', status: 'Failed', user: 'ops@bloom.shop', credits: 0, createdAt: '2026-11-10 21:28' },
      { id: 'T-8712', name: 'Bloom Reel', type: 'Product to Video', status: 'Success', user: 'ops@bloom.shop', credits: 45, createdAt: '2026-11-07 18:02' },
    ],
    BC10105: [
      { id: 'T-9102', name: 'Packshot Set', type: 'Image Generation', status: 'Success', user: 'team@pixelforge.ai', credits: 24, createdAt: '2026-11-11 02:15' },
      { id: 'T-9001', name: 'Clone Ad #441', type: 'Video Clone', status: 'Success', user: 'team@pixelforge.ai', credits: 60, createdAt: '2026-11-10 09:33' },
    ],
    BC10118: [
      { id: 'T-8755', name: 'Harbor PTV', type: 'Product to Video', status: 'Failed', user: 'creative@harbor.co', credits: 0, createdAt: '2026-11-08 10:12' },
    ],
    BC10124: [],
    BC10131: [
      { id: 'T-9110', name: 'UGC Style Clone', type: 'Video Clone', status: 'Running', user: 'growth@orbitdtc.com', credits: 60, createdAt: '2026-11-11 06:28' },
    ],
  };

  const creditLogs = {
    BC10086: [
      { time: '2026-11-11 07:18', kind: 'Spent', name: 'Video Clone · Winter Lookbook', delta: -60, operator: '系统' },
      { time: '2026-11-10 15:44', kind: 'Spent', name: 'Image Editing · Hero Still Edit', delta: -12, operator: '系统' },
      { time: '2026-11-05 10:00', kind: 'Earned', name: '月包发放', delta: 1000, operator: '系统' },
      { time: '2026-10-20 16:12', kind: 'Manual Adjust', name: '商务加赠', delta: 200, operator: OPERATOR },
    ],
    BC10092: [
      { time: '2026-11-10 21:28', kind: 'Refunded', name: 'Image Editing 失败退还', delta: 8, operator: '系统' },
      { time: '2026-11-07 18:20', kind: 'Spent', name: 'Product to Video · Bloom Reel', delta: -45, operator: '系统' },
    ],
    BC10105: [
      { time: '2026-11-11 02:40', kind: 'Spent', name: 'Image Generation · Packshot', delta: -24, operator: '系统' },
      { time: '2026-11-01 00:01', kind: 'Earned', name: '月包发放', delta: 2000, operator: '系统' },
    ],
    BC10118: [
      { time: '2026-11-08 10:12', kind: 'Refunded', name: '积分不足 · 未扣费', delta: 0, operator: '系统' },
      { time: '2026-11-03 09:00', kind: 'Spent', name: 'Video Clone', delta: -60, operator: '系统' },
    ],
    BC10124: [
      { time: '2026-10-01 19:40', kind: 'Manual Adjust', name: '停用前清零保留', delta: -80, operator: OPERATOR },
    ],
    BC10131: [
      { time: '2026-11-11 06:28', kind: 'Spent', name: 'Video Clone · UGC Style', delta: -60, operator: '系统' },
      { time: '2026-11-06 13:12', kind: 'Earned', name: '注册赠送', delta: 500, operator: '系统' },
    ],
  };

  let changeLogs = [
    { id: 'L1', time: '2026-11-10 16:12:08', customerId: 'BC10086', customerName: 'Northstar Studio', label: 'Credit 额度', before: '1080', after: '1280', reason: '商务加赠', operator: OPERATOR },
    { id: 'L2', time: '2026-11-06 13:12:44', customerId: 'BC10131', customerName: 'Orbit DTC', label: '创建客户', before: '—', after: '启用 / Credit 500', reason: '官网自助注册同步', operator: '系统' },
    { id: 'L3', time: '2026-11-02 16:40:11', customerId: 'BC10118', customerName: 'Harbor Brands', label: '创建客户', before: '—', after: '启用 / Credit 200', reason: '—', operator: '系统' },
    { id: 'L4', time: '2026-10-28 14:06:02', customerId: 'BC10092', customerName: 'Bloom Retail', label: '创建客户', before: '—', after: '启用 / Credit 300', reason: '—', operator: '系统' },
    { id: 'L5', time: '2026-10-15 09:22:30', customerId: 'BC10124', customerName: 'Quiet Label', label: '客户启停', before: '启用', after: '停用', reason: '客户申请停用', operator: OPERATOR },
    { id: 'L6', time: '2026-10-12 09:18:55', customerId: 'BC10086', customerName: 'Northstar Studio', label: '创建客户', before: '—', after: '启用 / Credit 500', reason: '—', operator: '系统' },
    { id: 'L7', time: '2026-09-03 11:22:18', customerId: 'BC10105', customerName: 'PixelForge', label: '创建客户', before: '—', after: '启用 / Credit 2000', reason: '商务渠道开通', operator: OPERATOR },
    { id: 'L8', time: '2026-09-03 11:25:40', customerId: 'BC10105', customerName: 'PixelForge', label: '重置密码', before: '—', after: '已重置', reason: '首次开通', operator: OPERATOR },
  ];

  const overviewByPreset = {
    7: {
      visitUv: 4820, visitTotal: 12480, registerClicks: 916, registerUsers: 640, registerDone: 128, taskCount: 412, taskUsers: 86,
      active: 214, creditsUsed: 18640, activeAccounts: 168,
      rates: { v2c: '13.3%', c2r: '20.0%', r2t: '42.2%' },
      dau: [
        { d: '11-05', active: 28, neu: 12 },
        { d: '11-06', active: 31, neu: 18 },
        { d: '11-07', active: 26, neu: 9 },
        { d: '11-08', active: 34, neu: 15 },
        { d: '11-09', active: 29, neu: 11 },
        { d: '11-10', active: 38, neu: 22 },
        { d: '11-11', active: 28, neu: 8 },
      ],
      dailyCredits: [1860, 920, 1540, 1680, 410, 0, 980, 1320, 760, 1180, 1450, 210, 890, 1620],
      taskTypes: [
        { label: 'Image_to_Video', value: 2680, color: '#0d99ff' },
        { label: 'Video_Reference', value: 2520, color: '#1457f0' },
        { label: 'Text_to_Video', value: 1880, color: '#13c2c2' },
        { label: 'Video_Edit', value: 1520, color: '#722ed1' },
        { label: 'Video_Generate', value: 1280, color: '#2f54eb' },
        { label: 'Text_to_Image', value: 960, color: '#fa8c16' },
        { label: 'Image_to_Image', value: 820, color: '#eb2f96' },
        { label: 'Product_to_Video', value: 640, color: '#52c41a' },
        { label: 'Image_Edit', value: 420, color: '#597ef7' },
        { label: 'Face_Swap', value: 280, color: '#faad14' },
      ],
    },
    15: {
      visitUv: 9680, visitTotal: 25140, registerClicks: 1820, registerUsers: 1210, registerDone: 246, taskCount: 890, taskUsers: 164,
      active: 318, creditsUsed: 40210, activeAccounts: 245,
      rates: { v2c: '12.5%', c2r: '20.3%', r2t: '40.7%' },
      dau: null,
      dailyCredits: null,
      taskTypes: null,
    },
    30: {
      visitUv: 18420, visitTotal: 48620, registerClicks: 3410, registerUsers: 2280, registerDone: 486, taskCount: 1720, taskUsers: 302,
      active: 452, creditsUsed: 81200, activeAccounts: 360,
      rates: { v2c: '12.4%', c2r: '21.3%', r2t: '38.9%' },
      dau: null,
      dailyCredits: null,
      taskTypes: null,
    },
    90: {
      visitUv: 51200, visitTotal: 138600, registerClicks: 9200, registerUsers: 6100, registerDone: 1280, taskCount: 4860, taskUsers: 720,
      active: 890, creditsUsed: 248000, activeAccounts: 710,
      rates: { v2c: '11.9%', c2r: '21.0%', r2t: '36.4%' },
      dau: null,
      dailyCredits: null,
      taskTypes: null,
    },
  };

  const TASK_TYPE_FALLBACK = [
    { label: 'Image_to_Video', value: 2680, color: '#0d99ff' },
    { label: 'Video_Reference', value: 2520, color: '#1457f0' },
    { label: 'Text_to_Video', value: 1880, color: '#13c2c2' },
    { label: 'Video_Edit', value: 1520, color: '#722ed1' },
    { label: 'Video_Generate', value: 1280, color: '#2f54eb' },
    { label: 'Text_to_Image', value: 960, color: '#fa8c16' },
    { label: 'Image_to_Image', value: 820, color: '#eb2f96' },
    { label: 'Product_to_Video', value: 640, color: '#52c41a' },
    { label: 'Image_Edit', value: 420, color: '#597ef7' },
    { label: 'Face_Swap', value: 280, color: '#faad14' },
  ];

  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  function fmt(n) {
    return Number(n).toLocaleString('en-US');
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function formatDate(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function formatDateTime(d = new Date()) {
    return `${formatDate(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  function rangeLabel() {
    const end = new Date();
    const start = new Date();
    if (state.customStart && state.customEnd) {
      return { label: '自定义范围', sub: `${state.customStart} ~ ${state.customEnd}` };
    }
    start.setDate(end.getDate() - (state.datePreset - 1));
    return { label: `最近 ${state.datePreset} 天`, sub: `${formatDate(start)} ~ ${formatDate(end)}` };
  }

  function currentOverview() {
    const key = state.customStart ? 7 : state.datePreset;
    const base = overviewByPreset[key] || overviewByPreset[7];
    const dayCount = state.customStart ? 7 : state.datePreset;
    const dau = (!base.dau || base.dau.length !== dayCount)
      ? (dayCount === 7 ? overviewByPreset[7].dau : synthesizeDau(Math.min(dayCount, 30), base))
      : base.dau;
    return { ...base, dau };
  }

  function synthesizeDau(n, base) {
    const avg = Math.max(8, Math.round(base.active / Math.max(n * 0.55, 1)));
    const out = [];
    const end = new Date();
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(end);
      d.setDate(end.getDate() - i);
      const wobble = ((i * 7) % 9) - 4;
      out.push({
        d: `${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
        active: Math.max(4, avg + wobble),
        neu: Math.max(1, Math.round((avg + wobble) * 0.35)),
      });
    }
    return out;
  }

  function synthesizeDailyCredits(n, total) {
    const end = new Date();
    const avg = Math.max(80, Math.round(total / Math.max(n, 1)));
    const out = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(end);
      d.setDate(end.getDate() - i);
      const wobble = ((i * 13) % 11) - 5;
      const weekend = d.getDay() === 0 || d.getDay() === 6 ? 0.45 : 1;
      out.push({
        label: `${d.getMonth() + 1}月 ${d.getDate()}`,
        value: Math.max(0, Math.round((avg + wobble * 40) * weekend)),
      });
    }
    return out;
  }

  function chartGridLines(max) {
    const steps = 4;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const val = Math.round((max / steps) * (steps - i));
      return `<div class="usage-chart-grid-line"><span class="usage-chart-grid-label">${fmt(val)}</span></div>`;
    }).join('');
  }

  function shortTypeLabel(label) {
    return String(label || '').replace(/_/g, ' ');
  }

  function renderBarChart(container, title, items, opts = {}) {
    if (!container) return;
    const max = Math.max(...items.map((d) => d.value), 1);
    const every = opts.labelEvery ?? (items.length <= 14 ? 1 : items.length <= 31 ? 2 : 5);
    const variant = opts.variant || 'daily';
    const tall = opts.tall ? 'tall' : '';
    container.innerHTML = `
      <div class="usage-chart-head"><div class="usage-chart-title">${esc(title)}</div></div>
      <div class="usage-chart-area">
        <div class="usage-chart-plot">
          <div class="usage-chart-grid">${chartGridLines(max)}</div>
          <div class="usage-vchart usage-vchart--${variant} ${tall}">
            ${items.map((d, i) => {
              const h = Math.max(4, Math.round((d.value / max) * 100));
              const show = i % every === 0 || i === items.length - 1;
              const style = d.color
                ? `background:linear-gradient(180deg, ${d.color}cc 0%, ${d.color} 58%, ${d.color}dd 100%);box-shadow:0 4px 14px ${d.color}33;`
                : '';
              const labelCls = opts.wrapLabels ? 'multiline' : '';
              const muted = !opts.wrapLabels && !show ? 'muted' : '';
              const lbl = opts.wrapLabels ? shortTypeLabel(d.label) : (show ? d.label : '');
              const alwaysValue = !!opts.showValues;
              return `<div class="usage-vbar-col ${opts.wide ? 'wide' : ''} ${alwaysValue ? 'show-value' : ''}" title="${esc(d.label)}: ${fmt(d.value)}">
                <div class="usage-vbar-wrap">
                  <span class="usage-vbar-value">${fmt(d.value)}</span>
                  <div class="usage-vbar ${variant === 'type' ? 'usage-vbar--type' : ''}" style="height:${h}%;${style}"></div>
                </div>
                <div class="usage-vbar-label ${labelCls} ${muted}">${esc(lbl)}</div>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>`;
  }

  function renderDauChart(container, days) {
    if (!container) return;
    const max = Math.max(...days.map((x) => Math.max(x.active, x.neu)), 1);
    container.innerHTML = `
      <div class="usage-chart-head">
        <div class="usage-chart-title">每日活跃趋势</div>
        <div class="usage-chart-meta dau-legend">
          <span><i class="legend-dot"></i>当日活跃（登录）</span>
          <span><i class="legend-dot muted"></i>当日新注册</span>
        </div>
      </div>
      <div class="usage-chart-area">
        <div class="usage-chart-plot">
          <div class="usage-chart-grid">${chartGridLines(max)}</div>
          <div class="usage-vchart usage-vchart--dau">
            ${days.map((day) => {
              const hA = Math.max(4, Math.round((day.active / max) * 100));
              const hN = Math.max(4, Math.round((day.neu / max) * 100));
              return `<div class="usage-vbar-col wide" title="${day.d} · 活跃 ${day.active} · 新注册 ${day.neu}">
                <div class="usage-vbar-wrap">
                  <span class="usage-vbar-value">${day.active} / ${day.neu}</span>
                  <div class="usage-vbar usage-vbar--pair" style="height:${hA}%"></div>
                  <div class="usage-vbar usage-vbar--neu" style="height:${hN}%"></div>
                </div>
                <div class="usage-vbar-label">${esc(day.d)}</div>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>`;
  }

  function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.classList.remove('show'), 2200);
  }

  function setPage(page) {
    state.page = page;
    document.querySelectorAll('.nav-link[data-page]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.page === page);
    });
    document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');
    document.getElementById('topbarTitle').textContent = PAGE_TITLES[page];
    if (page === 'customers') renderCustomers();
    if (page === 'logs') renderLogs();
    if (page === 'overview') renderOverview();
  }

  function updateDateTrigger() {
    const { label, sub } = rangeLabel();
    document.getElementById('dateRangeLabel').textContent = label;
    document.getElementById('dateRangeSub').textContent = sub;
    document.querySelectorAll('.date-range-option').forEach((btn) => {
      btn.classList.toggle('active', !state.customStart && Number(btn.dataset.preset) === state.datePreset);
    });
  }

  function renderOverview() {
    updateDateTrigger();
    const o = currentOverview();
    document.getElementById('funnelGrid').innerHTML = `
      <article class="funnel-card">
        <div class="funnel-step">01 · 官网访问</div>
        <div class="funnel-value">${fmt(o.visitUv)}</div>
        <div class="funnel-sub">全部访问量 ${fmt(o.visitTotal)}</div>
      </article>
      <article class="funnel-card">
        <div class="funnel-step">02 · 点击注册</div>
        <div class="funnel-value">${fmt(o.registerUsers)}</div>
        <div class="funnel-sub">全部点击次数 ${fmt(o.registerClicks)}</div>
      </article>
      <article class="funnel-card">
        <div class="funnel-step">03 · 完成注册</div>
        <div class="funnel-value">${fmt(o.registerDone)}</div>
        <div class="funnel-sub">—</div>
      </article>
      <article class="funnel-card">
        <div class="funnel-step">04 · 创建任务</div>
        <div class="funnel-value">${fmt(o.taskUsers)}</div>
        <div class="funnel-sub">创建任务总次数 ${fmt(o.taskCount)}</div>
      </article>`;

    document.getElementById('funnelRates').innerHTML = `
      <div class="funnel-rate">访问 → 点注册<strong>${o.rates.v2c}</strong></div>
      <div class="funnel-rate">点注册 → 完成注册<strong>${o.rates.c2r}</strong></div>
      <div class="funnel-rate">完成注册 → 创建任务<strong>${o.rates.r2t}</strong></div>`;

    document.getElementById('metricRow').innerHTML = `
      <div class="metric-card">
        <div class="metric-label">活跃人数</div>
        <div class="metric-value">${fmt(o.active)}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Credit 总消耗</div>
        <div class="metric-value">${fmt(o.creditsUsed)}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">有消耗账号数</div>
        <div class="metric-value">${fmt(o.activeAccounts)}</div>
      </div>`;

    const days = state.customStart ? Math.min(15, state.datePreset) : state.datePreset;
    const creditItems = (o.dailyCredits && o.dailyCredits.length)
      ? o.dailyCredits.map((v, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (o.dailyCredits.length - 1 - i));
          return { label: `${d.getMonth() + 1}月 ${d.getDate()}`, value: v };
        })
      : synthesizeDailyCredits(Math.min(days, 30), o.creditsUsed);
    const typeItems = o.taskTypes || TASK_TYPE_FALLBACK.map((t) => ({
      ...t,
      value: Math.max(40, Math.round(t.value * (o.creditsUsed / 18640))),
    }));

    renderBarChart(document.getElementById('dailyCreditsChart'), '每日积分使用情况', creditItems, {
      variant: 'daily',
      labelEvery: creditItems.length <= 14 ? 1 : creditItems.length <= 31 ? 2 : 5,
    });
    renderBarChart(document.getElementById('taskTypeChart'), '任务消耗情况', typeItems, {
      variant: 'type',
      wide: true,
      tall: true,
      wrapLabels: true,
      showValues: true,
    });
    renderDauChart(document.getElementById('dauChart'), o.dau);
  }

  function filteredCustomers() {
    const q = state.customerQuery.trim().toLowerCase();
    const rows = customers.filter((c) => {
      if (state.customerStatus !== 'all' && c.status !== state.customerStatus) return false;
      if (state.customerSource !== 'all' && c.source !== state.customerSource) return false;
      if (!q) return true;
      return [c.id, c.name, c.email, c.source].join(' ').toLowerCase().includes(q);
    });
    const { key, dir } = state.customerSort;
    const factor = dir === 'asc' ? 1 : -1;
    return rows.slice().sort((a, b) => {
      if (key === 'credits') return (a.credits - b.credits) * factor;
      if (key === 'creditsLifetime') return ((a.creditsLifetime || 0) - (b.creditsLifetime || 0)) * factor;
      const av = a[key] || '';
      const bv = b[key] || '';
      return av < bv ? -1 * factor : av > bv ? 1 * factor : 0;
    });
  }

  function statusBadge(status) {
    return status === 'active'
      ? '<span class="badge success">启用</span>'
      : '<span class="badge muted">停用</span>';
  }

  function sortMark(key) {
    if (state.customerSort.key !== key) return '<span class="sort-mark">↕</span>';
    return state.customerSort.dir === 'asc'
      ? '<span class="sort-mark active">↑</span>'
      : '<span class="sort-mark active">↓</span>';
  }

  function toggleCustomerSort(key) {
    if (state.customerSort.key === key) {
      state.customerSort.dir = state.customerSort.dir === 'asc' ? 'desc' : 'asc';
    } else {
      state.customerSort = { key, dir: 'desc' };
    }
    renderCustomers();
  }

  function renderCustomers() {
    document.getElementById('customerTotalCount').textContent = customers.length;
    const rows = filteredCustomers();
    const wrap = document.getElementById('customerTable');
    if (!rows.length) {
      wrap.innerHTML = '<div class="table-empty">没有符合条件的客户</div>';
      document.getElementById('customerPagination').innerHTML = '';
      return;
    }
    wrap.innerHTML = `<table>
      <thead>
        <tr>
          <th>客户</th>
          <th>邮箱</th>
          <th class="sortable" data-sort="creditsLifetime">历史累计积分 ${sortMark('creditsLifetime')}</th>
          <th class="sortable" data-sort="credits">当前积分 ${sortMark('credits')}</th>
          <th>来源</th>
          <th>状态</th>
          <th class="sortable" data-sort="createdAt">创建时间 ${sortMark('createdAt')}</th>
          <th class="sortable" data-sort="updatedAt">更新时间 ${sortMark('updatedAt')}</th>
          <th>最近登录</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((c) => `
          <tr>
            <td>
              <button class="customer-link" data-open="${c.id}">${esc(c.name)}</button>
              <div class="customer-id">${esc(c.id)}</div>
            </td>
            <td>${esc(c.email)}</td>
            <td>${fmt(c.creditsLifetime || 0)}</td>
            <td><strong>${fmt(c.credits)}</strong></td>
            <td><span class="badge info">${esc(c.source || '—')}</span></td>
            <td>${statusBadge(c.status)}</td>
            <td>${esc(c.createdAt)}</td>
            <td>${esc(c.updatedAt || '—')}</td>
            <td>${esc(c.lastLogin || '—')}</td>
            <td class="row-actions">
              <button class="secondary-btn small-btn" data-open="${c.id}">详情</button>
              <button class="ghost-btn small-btn" data-adjust="${c.id}">调 Credit</button>
            </td>
          </tr>`).join('')}
      </tbody>
    </table>`;
    document.getElementById('customerPagination').innerHTML =
      `<span>共 ${rows.length} 条</span>`;
  }

  function openDrawer(id, tab = 'behavior') {
    const c = customers.find((x) => x.id === id);
    if (!c) return;
    state.drawerId = id;
    state.drawerTab = tab;
    document.getElementById('drawerTitle').textContent = c.name;
    document.getElementById('drawerSubtitle').textContent =
      `${c.id} · ${c.email}${c.website ? ` · ${c.website}` : ''}`;
    document.getElementById('customerStrip').innerHTML = `
      <div class="strip-item"><label>历史累计积分</label><span>${fmt(c.creditsLifetime || 0)}</span></div>
      <div class="strip-item"><label>当前积分</label><span>${fmt(c.credits)}</span></div>
      <div class="strip-item"><label>来源</label><span>${esc(c.source)}</span></div>
      <div class="strip-item"><label>状态</label><span>${c.status === 'active' ? '启用' : '停用'}</span></div>
      <div class="strip-item"><label>注册时间</label><span>${esc(c.createdAt || '—')}</span></div>
      <div class="strip-item"><label>最近登录时间</label><span>${esc(c.lastLogin || '—')}</span></div>`;
    document.getElementById('customerNote').innerHTML =
      `<label>备注</label><strong>${esc(c.note || '—')}</strong>`;
    document.querySelectorAll('.drawer-tab').forEach((t) => {
      t.classList.toggle('active', t.dataset.tab === tab);
    });
    renderDrawerBody();
    document.getElementById('customerDrawerMask').classList.add('open');
  }

  function closeDrawer() {
    document.getElementById('customerDrawerMask').classList.remove('open');
    state.drawerId = null;
  }

  function renderDrawerBody() {
    const c = customers.find((x) => x.id === state.drawerId);
    if (!c) return;
    const body = document.getElementById('drawerBody');
    const footer = document.getElementById('drawerFooter');
    footer.innerHTML = `
      <button class="secondary-btn" data-adjust="${c.id}">调整 Credit</button>
      <button class="ghost-btn" id="toggleStatusBtn">${c.status === 'active' ? '停用客户' : '启用客户'}</button>`;

    if (state.drawerTab === 'behavior') {
      const list = behaviors[c.id] || [];
      body.innerHTML = `
        <div class="tab-toolbar">
          <select class="filter-select" id="behaviorRange">
            <option value="today" ${state.behaviorRange === 'today' ? 'selected' : ''}>今日</option>
            <option value="7" ${state.behaviorRange === '7' ? 'selected' : ''}>最近 7 天</option>
          </select>
        </div>
        ${list.length ? `<div class="timeline">${list.map((b) => `
          <div class="timeline-item">
            <div class="timeline-time">${esc(b.time)}</div>
            <div class="timeline-dot-col"><div class="timeline-dot"></div></div>
            <div class="timeline-body">
              <strong>${esc(b.type)}</strong>
              <p>${esc(b.summary)}</p>
              <div class="timeline-meta">
                <span class="badge ${b.result === 'success' ? 'success' : 'danger'}">${b.result === 'success' ? '成功' : '失败'}</span>
                ${b.ref ? `<span class="badge muted">${esc(b.ref)}</span>` : ''}
              </div>
            </div>
          </div>`).join('')}</div>` : '<div class="table-empty">暂无操作行为</div>'}`;
      return;
    }

    if (state.drawerTab === 'tasks') {
      const list = tasks[c.id] || [];
      body.innerHTML = list.length ? `<div class="compact-table"><table>
        <thead><tr><th>任务</th><th>类型</th><th>状态</th><th>创建人</th><th>Credit</th><th>创建时间</th></tr></thead>
        <tbody>${list.map((t) => `
          <tr>
            <td><strong>${esc(t.name)}</strong><div class="subtext">${esc(t.id)}</div></td>
            <td>${esc(t.type)}</td>
            <td><span class="badge ${t.status === 'Success' ? 'success' : t.status === 'Failed' ? 'danger' : t.status === 'Running' ? 'info' : 'muted'}">${esc(t.status)}</span></td>
            <td>${esc(t.user)}</td>
            <td>${t.credits}</td>
            <td>${esc(t.createdAt)}</td>
          </tr>`).join('')}</tbody></table></div>` : '<div class="table-empty">暂无任务</div>';
      return;
    }

    if (state.drawerTab === 'credits') {
      const list = creditLogs[c.id] || [];
      body.innerHTML = list.length ? `<div class="compact-table"><table>
        <thead><tr><th>时间</th><th>类型</th><th>名称 / 任务</th><th>Credit</th><th>操作人</th></tr></thead>
        <tbody>${list.map((row) => `
          <tr>
            <td>${esc(row.time)}</td>
            <td><span class="badge ${row.kind === 'Spent' ? 'danger' : 'success'}">${esc(row.kind)}</span></td>
            <td>${esc(row.name)}</td>
            <td><span class="credit-delta ${row.delta >= 0 ? 'pos' : 'neg'}">${row.delta > 0 ? '+' : ''}${row.delta}</span></td>
            <td>${esc(row.operator)}</td>
          </tr>`).join('')}</tbody></table></div>` : '<div class="table-empty">暂无积分变动</div>';
      return;
    }

    if (state.drawerTab === 'history') {
      const rows = changeLogs.filter((l) => l.customerId === c.id);
      body.innerHTML = rows.length
        ? `<div class="log-list">${rows.map(logCard).join('')}</div>`
        : '<div class="table-empty">暂无变更记录</div>';
    }
  }

  function logCard(log) {
    return `<div class="log-item">
      <div class="log-top"><strong>${esc(log.label)}</strong><time>${esc(log.time)}</time></div>
      <div class="log-change">
        <span class="value-chip">${esc(log.before)}</span>
        <span class="change-arrow">→</span>
        <span class="value-chip new">${esc(log.after)}</span>
      </div>
      <div class="log-reason">原因：${esc(log.reason || '—')}</div>
      <div class="log-operator">操作人：${esc(log.operator)}</div>
    </div>`;
  }

  function renderLogs() {
    const q = state.logQuery.trim().toLowerCase();
    const rows = changeLogs
      .slice()
      .sort((a, b) => (a.time < b.time ? 1 : -1))
      .filter((l) => {
        if (!q) return true;
        return [l.customerName, l.customerId, l.label, l.operator, l.reason].join(' ').toLowerCase().includes(q);
      });
    document.getElementById('globalLogCount').textContent = `共 ${rows.length} 条`;
    const wrap = document.getElementById('globalLogTable');
    if (!rows.length) {
      wrap.innerHTML = '<div class="table-empty">没有符合条件的变更记录</div>';
      return;
    }
    wrap.innerHTML = `<table>
      <thead>
        <tr>
          <th>修改时间</th>
          <th>客户</th>
          <th>修改项</th>
          <th>修改前 / 后</th>
          <th>修改原因</th>
          <th>操作人</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((log) => `
          <tr>
            <td>${esc(log.time)}</td>
            <td>
              <button class="customer-link" data-open="${log.customerId}">${esc(log.customerName)}</button>
              <div class="customer-id">${esc(log.customerId)}</div>
            </td>
            <td>${esc(log.label)}</td>
            <td>
              <span class="value-chip">${esc(log.before)}</span>
              <span class="change-arrow">→</span>
              <span class="value-chip new">${esc(log.after)}</span>
            </td>
            <td class="reason-cell">${esc(log.reason || '—')}</td>
            <td>${esc(log.operator)}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;
  }

  function openAddCustomer() {
    document.getElementById('addCustomerMask').classList.add('open');
  }

  function closeAddCustomer() {
    document.getElementById('addCustomerMask').classList.remove('open');
  }

  function confirmAddCustomer() {
    const name = document.getElementById('addName').value.trim();
    const email = document.getElementById('addEmail').value.trim();
    const website = document.getElementById('addWebsite').value.trim();
    const credits = Number(document.getElementById('addCredits').value || 0);
    const source = document.getElementById('addSource').value;
    const note = document.getElementById('addNote').value.trim();
    if (!name || !email) {
      showToast('请填写商户名称与登录邮箱');
      return;
    }
    const id = `BC${10000 + customers.length + 40}`;
    const now = formatDateTime().slice(0, 16);
    customers.unshift({
      id, name, email, website, creditsLifetime: credits, credits, source, sourceRaw: '', status: 'active',
      createdAt: now, updatedAt: now, lastLogin: '—', note,
    });
    behaviors[id] = [];
    tasks[id] = [];
    creditLogs[id] = [{
      time: now, kind: 'Earned', name: '开通赠送', delta: credits, operator: OPERATOR,
    }];
    changeLogs.unshift({
      id: `L${Date.now()}`,
      time: formatDateTime(),
      customerId: id,
      customerName: name,
      label: '创建客户',
      before: '—',
      after: `启用 / Credit ${credits}`,
      reason: note || '运营后台开通',
      operator: OPERATOR,
    });
    closeAddCustomer();
    renderCustomers();
    showToast('客户已创建，并写入变更记录');
    openDrawer(id, 'behavior');
  }

  function openAdjust(id) {
    const c = customers.find((x) => x.id === id);
    if (!c) return;
    state.adjustId = id;
    document.getElementById('adjustTitle').textContent = `调整 Credit · ${c.name} · ${c.email}`;
    document.getElementById('adjustCurrent').textContent = fmt(c.credits);
    document.getElementById('adjustNext').value = c.credits;
    document.getElementById('adjustReason').value = '';
    document.getElementById('adjustCreditMask').classList.add('open');
  }

  function closeAdjust() {
    document.getElementById('adjustCreditMask').classList.remove('open');
    state.adjustId = null;
  }

  function confirmAdjust() {
    const c = customers.find((x) => x.id === state.adjustId);
    if (!c) return;
    const next = Number(document.getElementById('adjustNext').value);
    const reason = document.getElementById('adjustReason').value.trim() || '—';
    if (Number.isNaN(next) || next < 0) {
      showToast('请输入有效积分');
      return;
    }
    const before = c.credits;
    const delta = next - before;
    c.credits = next;
    const now = formatDateTime();
    c.updatedAt = now.slice(0, 16);
    changeLogs.unshift({
      id: `L${Date.now()}`,
      time: now,
      customerId: c.id,
      customerName: c.name,
      label: 'Credit 额度',
      before: String(before),
      after: String(next),
      reason,
      operator: OPERATOR,
    });
    if (!creditLogs[c.id]) creditLogs[c.id] = [];
    creditLogs[c.id].unshift({
      time: now.slice(0, 16),
      kind: 'Manual Adjust',
      name: reason === '—' ? '运营调额' : reason,
      delta,
      operator: OPERATOR,
    });
    closeAdjust();
    renderCustomers();
    if (state.drawerId === c.id) openDrawer(c.id, state.drawerTab);
    if (state.page === 'logs') renderLogs();
    showToast('限额已更新，并写入变更记录');
  }

  function openDisableConfirm() {
    const c = customers.find((x) => x.id === state.drawerId);
    if (!c || c.status !== 'active') return;
    document.getElementById('disableConfirmTitle').textContent = `确认停用 · ${c.name}`;
    document.getElementById('disableConfirmText').textContent =
      `确定停用「${c.name}」（${c.email}）？停用后该客户将无法登录。`;
    document.getElementById('disableConfirmMask').classList.add('open');
  }

  function closeDisableConfirm() {
    document.getElementById('disableConfirmMask').classList.remove('open');
  }

  function applyStatusChange(c) {
    const before = c.status === 'active' ? '启用' : '停用';
    c.status = c.status === 'active' ? 'disabled' : 'active';
    const after = c.status === 'active' ? '启用' : '停用';
    c.updatedAt = formatDateTime().slice(0, 16);
    changeLogs.unshift({
      id: `L${Date.now()}`,
      time: formatDateTime(),
      customerId: c.id,
      customerName: c.name,
      label: '客户启停',
      before,
      after,
      reason: '运营后台操作',
      operator: OPERATOR,
    });
    openDrawer(c.id, state.drawerTab);
    renderCustomers();
    showToast(`已${after}客户，并写入变更记录`);
  }

  function toggleStatus() {
    const c = customers.find((x) => x.id === state.drawerId);
    if (!c) return;
    if (c.status === 'active') {
      openDisableConfirm();
      return;
    }
    applyStatusChange(c);
  }

  function confirmDisableCustomer() {
    const c = customers.find((x) => x.id === state.drawerId);
    if (!c || c.status !== 'active') {
      closeDisableConfirm();
      return;
    }
    closeDisableConfirm();
    applyStatusChange(c);
  }

  function bind() {
    document.querySelectorAll('.nav-link[data-page]').forEach((btn) => {
      btn.addEventListener('click', () => setPage(btn.dataset.page));
    });

    const trigger = document.getElementById('dateRangeTrigger');
    const menu = document.getElementById('dateRangeMenu');
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
      trigger.setAttribute('aria-expanded', menu.classList.contains('open'));
    });
    document.addEventListener('click', () => menu.classList.remove('open'));
    menu.addEventListener('click', (e) => e.stopPropagation());

    document.querySelectorAll('.date-range-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.datePreset = Number(btn.dataset.preset);
        state.customStart = null;
        state.customEnd = null;
        menu.classList.remove('open');
        renderOverview();
      });
    });
    document.getElementById('applyCustomRange').addEventListener('click', () => {
      const s = document.getElementById('customStart').value;
      const e = document.getElementById('customEnd').value;
      if (!s || !e || s > e) {
        showToast('请选择有效的起止日期');
        return;
      }
      state.customStart = s;
      state.customEnd = e;
      menu.classList.remove('open');
      renderOverview();
    });

    document.getElementById('customerSearch').addEventListener('input', (e) => {
      state.customerQuery = e.target.value;
      renderCustomers();
    });
    document.getElementById('customerStatusFilter').addEventListener('change', (e) => {
      state.customerStatus = e.target.value;
      renderCustomers();
    });
    document.getElementById('customerSourceFilter').addEventListener('change', (e) => {
      state.customerSource = e.target.value;
      renderCustomers();
    });
    document.getElementById('logSearch').addEventListener('input', (e) => {
      state.logQuery = e.target.value;
      renderLogs();
    });

    document.getElementById('customerTable').addEventListener('click', (e) => {
      const sortTh = e.target.closest('th.sortable');
      if (sortTh) {
        toggleCustomerSort(sortTh.dataset.sort);
        return;
      }
      const open = e.target.closest('[data-open]');
      const adjust = e.target.closest('[data-adjust]');
      if (open) openDrawer(open.dataset.open);
      if (adjust) openAdjust(adjust.dataset.adjust);
    });
    document.getElementById('globalLogTable').addEventListener('click', (e) => {
      const open = e.target.closest('[data-open]');
      if (open) {
        setPage('customers');
        openDrawer(open.dataset.open, 'history');
      }
    });

    document.getElementById('closeDrawer').addEventListener('click', closeDrawer);
    document.getElementById('customerDrawerMask').addEventListener('click', (e) => {
      if (e.target.id === 'customerDrawerMask') closeDrawer();
    });
    document.querySelectorAll('.drawer-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        state.drawerTab = tab.dataset.tab;
        document.querySelectorAll('.drawer-tab').forEach((t) => t.classList.toggle('active', t === tab));
        renderDrawerBody();
      });
    });
    document.getElementById('drawerBody').addEventListener('change', (e) => {
      if (e.target.id === 'behaviorRange') {
        state.behaviorRange = e.target.value;
        showToast(e.target.value === 'today' ? '已切换为今日行为' : '已切换为最近 7 天（示意数据同今日）');
      }
    });
    document.getElementById('drawerFooter').addEventListener('click', (e) => {
      if (e.target.id === 'toggleStatusBtn') toggleStatus();
      const adjust = e.target.closest('[data-adjust]');
      if (adjust) openAdjust(adjust.dataset.adjust);
    });

    document.getElementById('openAddCustomer').addEventListener('click', openAddCustomer);
    document.getElementById('closeAddCustomer').addEventListener('click', closeAddCustomer);
    document.getElementById('cancelAddCustomer').addEventListener('click', closeAddCustomer);
    document.getElementById('confirmAddCustomer').addEventListener('click', confirmAddCustomer);
    document.getElementById('addCustomerMask').addEventListener('click', (e) => {
      if (e.target.id === 'addCustomerMask') closeAddCustomer();
    });

    document.getElementById('closeAdjustCredit').addEventListener('click', closeAdjust);
    document.getElementById('cancelAdjustCredit').addEventListener('click', closeAdjust);
    document.getElementById('confirmAdjustCredit').addEventListener('click', confirmAdjust);
    document.getElementById('adjustCreditMask').addEventListener('click', (e) => {
      if (e.target.id === 'adjustCreditMask') closeAdjust();
    });

    document.getElementById('closeDisableConfirm').addEventListener('click', closeDisableConfirm);
    document.getElementById('cancelDisableConfirm').addEventListener('click', closeDisableConfirm);
    document.getElementById('confirmDisableCustomer').addEventListener('click', confirmDisableCustomer);
    document.getElementById('disableConfirmMask').addEventListener('click', (e) => {
      if (e.target.id === 'disableConfirmMask') closeDisableConfirm();
    });
  }

  bind();
  renderOverview();
  renderCustomers();
  renderLogs();
})();
