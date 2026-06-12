let state = {};

  /* ═══════════════════════════════════════════════════
     HELPERS
     ═══════════════════════════════════════════════════ */
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    return [parseInt(hex.substring(0,2),16), parseInt(hex.substring(2,4),16), parseInt(hex.substring(4,6),16)];
  }

  function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

  function showToast(msg, type) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast ' + (type || '');
    // Force reflow
    void t.offsetHeight;
    t.classList.add('show');
    setTimeout(() => { t.classList.remove('show'); }, 2800);
  }

  function escAttr(str) { return String(str).replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

  /* ═══════════════════════════════════════════════════
     INIT & STATE
     ═══════════════════════════════════════════════════ */
  function init() {
    const saved = localStorage.getItem('progresscard_studio_data');
    if (saved) {
      try {
        state = JSON.parse(saved);
        // Migrate old data: ensure new fields exist
        if (!state.theme) state.theme = deepClone(defaultData.theme);
        if (!state.chipsLabel) state.chipsLabel = defaultData.chipsLabel;
        if (!state.profile.email && state.profile.email !== '') state.profile.email = '';
        if (!state.profile.linkedin && state.profile.linkedin !== '') state.profile.linkedin = '';
        if (!state.profile.twitter && state.profile.twitter !== '') state.profile.twitter = '';
        if (!state.profile.website && state.profile.website !== '') state.profile.website = '';
        if (!state.profileBadges) state.profileBadges = state.profile.badges || deepClone(defaultData.profileBadges);
        delete state.profile.badges; // migrate old location
      } catch (e) {
        state = deepClone(defaultData);
      }
    } else {
      state = deepClone(defaultData);
    }
    
    populateFormFields();
    applyThemeToDOM();
    renderAll();
    buildThemePresetsUI();
    buildTemplateGridUI();
  }

  function populateFormFields() {
    document.getElementById('input-fname').value = state.profile.name;
    document.getElementById('input-avatar').value = state.profile.avatar;
    document.getElementById('input-fhandle').value = state.profile.handle;
    document.getElementById('input-linkedin').value = state.profile.linkedin || '';
    document.getElementById('input-email').value = state.profile.email || '';
    document.getElementById('input-twitter').value = state.profile.twitter || '';
    document.getElementById('input-website').value = state.profile.website || '';
    document.getElementById('input-weekpill').value = state.header.weekText;
    document.getElementById('input-date').value = state.header.dateText;
    document.getElementById('input-title').value = state.header.title;
    document.getElementById('input-subtitle').value = state.header.subtitle;
    document.getElementById('input-quote').value = state.quote;
    document.getElementById('input-chips-label').value = state.chipsLabel;
  }

  function saveState() {
    localStorage.setItem('progresscard_studio_data', JSON.stringify(state));
  }

  /* ═══════════════════════════════════════════════════
     TAB NAVIGATION
     ═══════════════════════════════════════════════════ */
  function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick').includes(tabId));
    if (activeBtn) activeBtn.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  }

  /* ═══════════════════════════════════════════════════
     UPDATE HANDLERS
     ═══════════════════════════════════════════════════ */
  function updateProfileField(key, val) {
    state.profile[key] = val;
    saveState(); renderCard();
  }

  function updateSocialField(key, val) {
    state.profile[key] = val;
    saveState(); renderCard();
  }

  function updateHeaderField(key, val) {
    state.header[key] = val;
    saveState(); renderCard();
  }

  function updateQuote(val) {
    state.quote = val;
    saveState(); renderCard();
  }

  function updateChipsLabel(val) {
    state.chipsLabel = val;
    saveState(); renderCard();
  }

  /* ═══════════════════════════════════════════════════
     STATS EDITOR (flexible count)
     ═══════════════════════════════════════════════════ */
  const statThemeOptions = [
    ['java','Orange'],['lc','Gold'],['green','Green'],['blue','Blue'],
    ['pink','Pink'],['purple','Purple'],['cyan','Cyan'],['red','Red'],
    ['amber','Amber'],['teal','Teal']
  ];

  function renderStatsEditor() {
    const c = document.getElementById('stats-editor-container');
    c.innerHTML = '';
    state.stats.forEach((stat, idx) => {
      const d = document.createElement('div');
      d.className = 'list-item-edit';
      d.innerHTML = `
        <div class="list-item-edit-header">
          <span style="font-size:11px;font-weight:700;color:var(--ed-accent);">STAT ${idx+1}</span>
          <button class="btn-delete" onclick="deleteStat(${idx})">Remove</button>
        </div>
        <div class="form-group row-flex" style="margin-bottom:8px;">
          <div><label>Label</label><input type="text" value="${escAttr(stat.label)}" oninput="updateStat(${idx},'label',this.value)" /></div>
          <div><label>Value</label><input type="text" value="${escAttr(stat.value)}" oninput="updateStat(${idx},'value',this.value)" /></div>
        </div>
        <div class="form-group row-flex" style="margin-bottom:0;">
          <div><label>Subtext</label><input type="text" value="${escAttr(stat.sub)}" oninput="updateStat(${idx},'sub',this.value)" /></div>
          <div><label>Color</label>
            <select onchange="updateStat(${idx},'theme',this.value)">
              ${statThemeOptions.map(([v,l]) => `<option value="${v}" ${stat.theme===v?'selected':''}>${l}</option>`).join('')}
            </select>
          </div>
        </div>`;
      c.appendChild(d);
    });
  }

  function updateStat(idx, key, val) { state.stats[idx][key] = val; saveState(); renderCard(); }
  function deleteStat(idx) { state.stats.splice(idx,1); saveState(); renderAll(); }
  function addStat() {
    state.stats.push({ label:"New Stat", value:"0", sub:"description", theme:"blue" });
    saveState(); renderAll();
  }

  /* ═══════════════════════════════════════════════════
     BADGES EDITOR
     ═══════════════════════════════════════════════════ */
  function renderBadgesEditor() {
    const c = document.getElementById('badges-editor-container');
    c.innerHTML = '';
    state.profileBadges.forEach((badge, idx) => {
      const r = document.createElement('div');
      r.className = 'badge-edit-row';
      r.innerHTML = `
        <input type="text" value="${escAttr(badge.icon)}" style="text-align:center;padding:6px;" oninput="updateBadge(${idx},'icon',this.value)" placeholder="🎯" />
        <input type="text" value="${escAttr(badge.label)}" style="padding:6px;" oninput="updateBadge(${idx},'label',this.value)" />
        <button class="btn-delete" onclick="deleteBadge(${idx})">✕</button>`;
      c.appendChild(r);
    });
    const addBtn = document.createElement('button');
    addBtn.className = 'btn-add';
    addBtn.style.padding = '6px'; addBtn.style.fontSize = '11px';
    addBtn.innerHTML = '➕ Add Badge';
    addBtn.onclick = addBadge;
    c.appendChild(addBtn);
  }

  function updateBadge(idx, key, val) { state.profileBadges[idx][key] = val; saveState(); renderCard(); }
  function deleteBadge(idx) { state.profileBadges.splice(idx,1); saveState(); renderAll(); }
  function addBadge() { state.profileBadges.push({icon:"⭐",label:"New"}); saveState(); renderAll(); }

  /* ═══════════════════════════════════════════════════
     PANELS EDITOR (flexible count 1-3)
     ═══════════════════════════════════════════════════ */
  const dotColorOptions = [
    ['#f89820','Orange'],['#22c55e','Green'],['#3b82f6','Blue'],['#a855f7','Purple'],
    ['#ec4899','Pink'],['#06b6d4','Cyan'],['#f97316','Amber'],['#ef4444','Red'],
    ['#14b8a6','Teal'],['#d946ef','Magenta'],['#8b5cf6','Violet']
  ];

  const fillClassOptions = [
    ['done-green','Green'],['done-purple','Purple'],['done-blue','Blue'],['done-java','Orange'],
    ['done-pink','Pink'],['done-cyan','Cyan'],['done-red','Red'],['done-amber','Amber'],
    ['done-teal','Teal'],['partial','Indigo'],['none','Grey (Empty)']
  ];

  function renderPanelsEditor() {
    const c = document.getElementById('panels-editor-container');
    c.innerHTML = '';
    state.panels.forEach((panel, pi) => {
      const section = document.createElement('div');
      section.className = 'list-item-edit';
      section.style.marginBottom = '16px';
      
      let itemsHTML = '';
      panel.items.forEach((item, ii) => {
        itemsHTML += `
        <div class="list-item-edit" style="background:rgba(255,255,255,0.01);border-color:rgba(255,255,255,0.05);padding:10px;margin-bottom:8px;">
          <div class="list-item-edit-header" style="margin-bottom:6px;">
            <span style="font-size:10px;font-weight:600;color:var(--ed-text-muted)">Row ${ii+1}</span>
            <button class="btn-delete" onclick="deleteProgressItem(${pi},${ii})">✕</button>
          </div>
          <div class="form-group row-flex" style="margin-bottom:6px;">
            <div style="flex:2"><label>Label</label><input type="text" value="${escAttr(item.label)}" oninput="updateProgressItem(${pi},${ii},'label',this.value)" /></div>
            <div><label>Status</label>
              <select onchange="updateProgressItem(${pi},${ii},'badge',this.value)">
                <option value="ok" ${item.badgeClass==='ok'?'selected':''}>✅ Done</option>
                <option value="wip" ${item.badgeClass==='wip'?'selected':''}>WIP</option>
                <option value="no" ${item.badgeClass==='no'?'selected':''}>🔲 Todo</option>
              </select>
            </div>
          </div>
          <div class="form-group row-flex" style="margin-bottom:0;align-items:flex-end;">
            <div><label>Fill Color</label>
              <select onchange="updateProgressItem(${pi},${ii},'fillClass',this.value)">
                ${fillClassOptions.map(([v,l]) => `<option value="${v}" ${item.fillClass===v?'selected':''}>${l}</option>`).join('')}
              </select>
            </div>
            <div><label>Width</label>
              <div class="slider-container">
                <input type="range" min="0" max="100" value="${item.width||100}" oninput="updateProgressSlider(${pi},${ii},this.value)" />
                <span class="slider-val" id="sv-${pi}-${ii}">${item.width||100}%</span>
              </div>
            </div>
            <div style="flex:0 0 60px;display:flex;align-items:center;justify-content:center;height:35px;">
              <label style="margin-bottom:0;display:inline-flex;align-items:center;gap:4px;cursor:pointer;font-size:10px;">
                <input type="checkbox" ${item.isNew?'checked':''} onchange="updateProgressItem(${pi},${ii},'isNew',this.checked)" /> New
              </label>
            </div>
          </div>
        </div>`;
      });

      section.innerHTML = `
        <div class="list-item-edit-header">
          <span style="font-size:11px;font-weight:700;color:var(--ed-accent);">PANEL ${pi+1}</span>
          <button class="btn-delete" onclick="deletePanel(${pi})">Remove Panel</button>
        </div>
        <div class="form-group row-flex" style="margin-bottom:10px;">
          <div style="flex:2"><label>Title</label><input type="text" value="${escAttr(panel.title)}" oninput="updatePanelHeader(${pi},'title',this.value)" /></div>
          <div><label>Dot Color</label>
            <select onchange="updatePanelHeader(${pi},'dotColor',this.value)">
              ${dotColorOptions.map(([v,l]) => `<option value="${v}" ${panel.dotColor===v?'selected':''}>${l}</option>`).join('')}
            </select>
          </div>
        </div>
        ${itemsHTML}
        <button class="btn-add" style="margin-top:6px;" onclick="addProgressItem(${pi})"><span>➕</span> Add Row</button>`;
      c.appendChild(section);
    });
  }

  function updatePanelHeader(pi, key, val) { state.panels[pi][key] = val; saveState(); renderCard(); }
  
  function updateProgressSlider(pi, ii, val) {
    state.panels[pi].items[ii].width = parseInt(val);
    const el = document.getElementById(`sv-${pi}-${ii}`);
    if (el) el.textContent = val + '%';
    saveState(); renderCard();
  }

  function updateProgressItem(pi, ii, key, val) {
    const item = state.panels[pi].items[ii];
    if (key === 'label') item.label = val;
    if (key === 'isNew') item.isNew = val;
    if (key === 'fillClass') {
      item.fillClass = val;
      if (val === 'none') { item.width = 6; } else if (val.startsWith('done-')) { item.width = 100; }
      // Refresh the panel editor to update slider
      renderPanelsEditor();
    }
    if (key === 'badge') {
      item.badgeClass = val;
      item.badgeText = val === 'ok' ? '✅' : val === 'wip' ? 'WIP' : '🔲';
    }
    saveState(); renderCard();
  }

  function deleteProgressItem(pi, ii) { state.panels[pi].items.splice(ii,1); saveState(); renderAll(); }
  function addProgressItem(pi) {
    state.panels[pi].items.push({ label:"New Item", fillClass:"none", width:6, isNew:false, badgeText:"🔲", badgeClass:"no" });
    saveState(); renderAll();
  }
  function deletePanel(pi) {
    if (state.panels.length <= 1) { showToast('Need at least 1 panel', ''); return; }
    state.panels.splice(pi,1);
    saveState(); renderAll();
  }
  function addPanel() {
    if (state.panels.length >= 3) { showToast('Maximum 3 panels', ''); return; }
    state.panels.push({
      title: "📌 New Panel", dotColor: "#a855f7",
      items: [{ label:"Item 1", fillClass:"none", width:6, isNew:false, badgeText:"🔲", badgeClass:"no" }]
    });
    saveState(); renderAll();
  }

  /* ═══════════════════════════════════════════════════
     CHIPS EDITOR
     ═══════════════════════════════════════════════════ */
  const chipThemeOptions = [
    ['p','Purple ✦'],['b','Blue'],['g','Green'],['o','Orange'],
    ['r','Red'],['c','Cyan'],['k','Pink']
  ];

  function renderChipsEditor() {
    const c = document.getElementById('chips-editor-container');
    c.innerHTML = '';
    state.chips.forEach((chip, idx) => {
      const d = document.createElement('div');
      d.className = 'list-item-edit';
      d.style.padding = '8px 10px';
      d.innerHTML = `
        <div class="form-group row-flex" style="margin-bottom:0;align-items:center;">
          <div style="flex:2"><input type="text" value="${escAttr(chip.text)}" oninput="updateChip(${idx},'text',this.value)" /></div>
          <div><select onchange="updateChip(${idx},'theme',this.value)" style="padding:8px;">
            ${chipThemeOptions.map(([v,l]) => `<option value="${v}" ${chip.theme===v?'selected':''}>${l}</option>`).join('')}
          </select></div>
          <button class="btn-delete" style="padding:8px;" onclick="deleteChip(${idx})">✕</button>
        </div>`;
      c.appendChild(d);
    });
  }

  function updateChip(idx, key, val) { state.chips[idx][key] = val; saveState(); renderCard(); }
  function deleteChip(idx) { state.chips.splice(idx,1); saveState(); renderAll(); }
  function addChip() { state.chips.push({text:"New Chip",theme:"p"}); saveState(); renderAll(); }

  /* ═══════════════════════════════════════════════════
     THEME SYSTEM
     ═══════════════════════════════════════════════════ */
  function buildThemePresetsUI() {
    const grid = document.getElementById('theme-presets-grid');
    grid.innerHTML = '';
    Object.entries(themePresets).forEach(([key, t]) => {
      const btn = document.createElement('button');
      btn.className = 'theme-preset-btn' + (state.theme.preset === key ? ' active' : '');
      btn.onclick = () => applyThemePreset(key);
      btn.innerHTML = `<div class="theme-swatch" style="background:${t.accent};box-shadow:0 0 8px ${t.accent}40;"></div><span>${t.emoji} ${t.name}</span>`;
      grid.appendChild(btn);
    });
  }

  function renderThemeColorsEditor() {
    const c = document.getElementById('theme-colors-editor');
    const t = state.theme;
    c.innerHTML = `
      <div class="color-row">
        <label>Background</label>
        <input type="color" value="${t.bg}" onchange="updateThemeColor('bg',this.value)" />
        <input type="text" value="${t.bg}" onchange="updateThemeColor('bg',this.value)" />
      </div>
      <div class="color-row">
        <label>Accent</label>
        <input type="color" value="${t.accent}" onchange="updateThemeColor('accent',this.value)" />
        <input type="text" value="${t.accent}" onchange="updateThemeColor('accent',this.value)" />
      </div>
      <div class="color-row">
        <label>Accent Light</label>
        <input type="color" value="${t.accentLight}" onchange="updateThemeColor('accentLight',this.value)" />
        <input type="text" value="${t.accentLight}" onchange="updateThemeColor('accentLight',this.value)" />
      </div>
      <div class="color-row">
        <label>Primary Text</label>
        <input type="color" value="${t.t1}" onchange="updateThemeColor('t1',this.value)" />
        <input type="text" value="${t.t1}" onchange="updateThemeColor('t1',this.value)" />
      </div>
      <div class="color-row">
        <label>Secondary Text</label>
        <input type="color" value="${t.t2}" onchange="updateThemeColor('t2',this.value)" />
        <input type="text" value="${t.t2}" onchange="updateThemeColor('t2',this.value)" />
      </div>
      <div class="color-row">
        <label>Muted Text</label>
        <input type="color" value="${t.t3}" onchange="updateThemeColor('t3',this.value)" />
        <input type="text" value="${t.t3}" onchange="updateThemeColor('t3',this.value)" />
      </div>`;
  }

  function updateThemeColor(key, val) {
    state.theme[key] = val;
    state.theme.preset = 'custom';
    // Auto-derive orb1 from accent
    if (key === 'accent') {
      const [r,g,b] = hexToRgb(val);
      state.theme.orb1 = `rgba(${r},${g},${b},0.10)`;
    }
    saveState();
    applyThemeToDOM();
    renderThemeColorsEditor();
    buildThemePresetsUI();
    renderCard();
  }

  function applyThemePreset(presetKey) {
    const p = themePresets[presetKey];
    if (!p) return;
    state.theme = {
      preset: presetKey,
      bg: p.bg, accent: p.accent, accentLight: p.accentLight,
      orb1: p.orb1, orb2: p.orb2, orb3: p.orb3,
      t1: p.t1, t2: p.t2, t3: p.t3
    };
    saveState();
    applyThemeToDOM();
    buildThemePresetsUI();
    renderThemeColorsEditor();
    renderCard();
  }

  function applyThemeToDOM() {
    const wrap = document.getElementById('capture-wrap');
    const t = state.theme;
    const [ar,ag,ab] = hexToRgb(t.accent);
    const [lr,lg,lb] = hexToRgb(t.accentLight);

    wrap.style.background = t.bg;
    wrap.style.setProperty('--bg', t.bg);
    wrap.style.setProperty('--accent', t.accent);
    wrap.style.setProperty('--accent-light', t.accentLight);
    wrap.style.setProperty('--accent-5', `rgba(${ar},${ag},${ab},0.05)`);
    wrap.style.setProperty('--accent-7', `rgba(${ar},${ag},${ab},0.07)`);
    wrap.style.setProperty('--accent-8', `rgba(${ar},${ag},${ab},0.08)`);
    wrap.style.setProperty('--accent-10', `rgba(${ar},${ag},${ab},0.10)`);
    wrap.style.setProperty('--accent-12', `rgba(${ar},${ag},${ab},0.12)`);
    wrap.style.setProperty('--accent-15', `rgba(${ar},${ag},${ab},0.15)`);
    wrap.style.setProperty('--accent-25', `rgba(${ar},${ag},${ab},0.25)`);
    wrap.style.setProperty('--accent-28', `rgba(${ar},${ag},${ab},0.28)`);
    wrap.style.setProperty('--accent-30', `rgba(${ar},${ag},${ab},0.30)`);
    wrap.style.setProperty('--orb1', t.orb1);
    wrap.style.setProperty('--orb2', t.orb2);
    wrap.style.setProperty('--orb3', t.orb3);
    wrap.style.setProperty('--t1', t.t1);
    wrap.style.setProperty('--t2', t.t2);
    wrap.style.setProperty('--t3', t.t3);
  }

  /* ═══════════════════════════════════════════════════
     CARD RENDERING
     ═══════════════════════════════════════════════════ */
  function renderCard() {
    const card = document.getElementById('preview-card');

    // Header
    let html = `
      <div class="header">
        <div class="week-pill">${state.header.weekText}</div>
        <div class="date">${state.header.dateText}</div>
      </div>
      <div class="title">${state.header.title}</div>
      <div class="subtitle">${state.header.subtitle}</div>
      <div class="hr"></div>`;

    // Stats
    if (state.stats.length > 0) {
      html += '<div class="stats">';
      state.stats.forEach(s => {
        html += `<div class="stat ${s.theme}"><div class="stat-lbl">${s.label}</div><div class="stat-val">${s.value}</div><div class="stat-sub">${s.sub}</div></div>`;
      });
      html += '</div>';
    }

    // Panels
    if (state.panels.length > 0) {
      html += '<div class="panels-grid">';
      state.panels.forEach(panel => {
        html += `<div class="panel"><div class="panel-title"><div class="dot" style="background:${panel.dotColor};box-shadow:0 0 6px ${panel.dotColor};"></div>${panel.title}</div>`;
        panel.items.forEach(item => {
          let lbl = item.label;
          if (item.isNew) lbl += ' <span class="new-tag">NEW</span>';
          html += `<div class="prow"><div class="plabel">${lbl}</div><div class="ptrack"><div class="pfill ${item.fillClass}" style="width:${item.width}%;"></div></div><div class="pbadge ${item.badgeClass}">${item.badgeText}</div></div>`;
        });
        html += '</div>';
      });
      html += '</div>';
    }

    // Chips
    if (state.chips.length > 0) {
      html += `<div class="chips-section"><div class="chips-label">❖ ${state.chipsLabel}</div><div class="chips">`;
      state.chips.forEach(ch => { html += `<span class="chip ${ch.theme}">${ch.text}</span>`; });
      html += '</div></div>';
    }

    // Quote
    if (state.quote && state.quote.trim()) {
      html += `<div class="quote">${state.quote}</div>`;
    }

    // Footer
    const ghUrl = state.profile.handle.includes('http') ? state.profile.handle : 'https://' + state.profile.handle;
    html += `<div class="footer"><div class="fl"><div class="avatar">${state.profile.avatar}</div><div><div class="fname">${state.profile.name}</div><div class="fhandle"><a href="${ghUrl}" target="_blank" style="color:inherit;text-decoration:none;">${state.profile.handle}</a></div>`;
    
    // Social icons
    const socials = [];
    const getUrl = (val, prefix) => {
      if (val.startsWith('http')) return val;
      if (val.includes('.com') || val.includes('.io') || val.includes('.me') || val.includes('.net')) return 'https://' + val;
      return prefix + val;
    };
    if (state.profile.linkedin) socials.push(`<a href="${getUrl(state.profile.linkedin, 'https://linkedin.com/in/')}" target="_blank" class="social-icon-card li" style="text-decoration:none;">in</a>`);
    if (state.profile.email) socials.push(`<a href="mailto:${state.profile.email.replace('mailto:','')}" class="social-icon-card em" style="text-decoration:none;">✉</a>`);
    if (state.profile.twitter) socials.push(`<a href="${getUrl(state.profile.twitter, 'https://twitter.com/')}" target="_blank" class="social-icon-card tw" style="text-decoration:none;">𝕏</a>`);
    if (state.profile.website) socials.push(`<a href="${getUrl(state.profile.website, 'https://')}" target="_blank" class="social-icon-card wb" style="text-decoration:none;">🌐</a>`);
    if (socials.length > 0) {
      html += `<div class="social-row">${socials.join('')}</div>`;
    }
    
    html += '</div></div><div class="badges">';
    state.profileBadges.forEach(b => { html += `<div class="badge"><span>${b.icon}</span>${b.label}</div>`; });
    html += '</div></div>';

    card.innerHTML = html;
  }

  function renderAll() {
    renderCard();
    renderStatsEditor();
    renderBadgesEditor();
    renderPanelsEditor();
    renderChipsEditor();
    renderThemeColorsEditor();
  }

  /* ═══════════════════════════════════════════════════
     TEMPLATES
     ═══════════════════════════════════════════════════ */
  function buildTemplateGridUI() {
    const grid = document.getElementById('template-grid');
    grid.innerHTML = '';
    Object.entries(templatePresets).forEach(([key, t]) => {
      const card = document.createElement('div');
      card.className = 'template-card';
      card.onclick = () => applyTemplate(key);
      card.innerHTML = `<div class="template-card-emoji">${t.emoji}</div><div class="template-card-name">${t.name}</div><div class="template-card-desc">${t.desc}</div>`;
      grid.appendChild(card);
    });
  }

  function applyTemplate(key) {
    const t = templatePresets[key];
    if (!t) return;
    if (!confirm(`Apply "${t.name}" template? This will replace your card content (your profile info stays the same).`)) return;

    state.header = deepClone(t.header);
    state.stats = deepClone(t.stats);
    state.panels = deepClone(t.panels);
    state.chips = deepClone(t.chips);
    state.chipsLabel = t.chipsLabel;
    state.quote = t.quote;

    // Apply associated theme
    if (t.themePreset && themePresets[t.themePreset]) {
      applyThemePreset(t.themePreset);
    }

    saveState();
    populateFormFields();
    renderAll();
    closeTemplateModal();
    showToast(`${t.emoji} ${t.name} template applied!`, 'success');
  }

  function openTemplateModal() { document.getElementById('template-modal').style.display = 'flex'; }
  function closeTemplateModal() { document.getElementById('template-modal').style.display = 'none'; }

  /* ═══════════════════════════════════════════════════
     RESET
     ═══════════════════════════════════════════════════ */
  function resetToDefaults() {
    if (!confirm("Reset everything to default? This will erase all your changes.")) return;
    state = deepClone(defaultData);
    localStorage.removeItem('progresscard_studio_data');
    saveState();
    populateFormFields();
    applyThemeToDOM();
    buildThemePresetsUI();
    renderAll();
    showToast('Reset to defaults', 'success');
  }

  /* ═══════════════════════════════════════════════════
     EXPORT: PNG IMAGE
     ═══════════════════════════════════════════════════ */
  function exportCardImage() {
    const btn = document.getElementById('btn-download');
    const origText = btn.innerHTML;
    btn.innerHTML = '<span>⏳</span> Rendering...';
    btn.disabled = true;

    const wrap = document.getElementById('capture-wrap');
    const bgColor = state.theme.bg || '#060a12';
    
    html2canvas(wrap, {
      scale: 2.5,
      backgroundColor: bgColor,
      useCORS: true,
      allowTaint: true,
      logging: false,
      onclone: function(clonedDoc) {
        const clonedWrap = clonedDoc.getElementById('capture-wrap');
        if (clonedWrap) {
          clonedWrap.style.background = bgColor;
          // Flatten backdrop-filter which html2canvas can't render
          const card = clonedWrap.querySelector('.card');
          if (card) {
            card.style.backdropFilter = 'none';
            card.style.webkitBackdropFilter = 'none';
          }
          // Fix html2canvas bug with gradient text (renders as white box)
          const titleEl = clonedWrap.querySelector('.title');
          if (titleEl) {
            titleEl.style.background = 'none';
            titleEl.style.webkitBackgroundClip = 'initial';
            titleEl.style.webkitTextFillColor = 'initial';
            titleEl.style.color = state.theme.t1;
          }
        }
      }
    }).then(canvas => {
      const link = document.createElement('a');
      const safeName = state.profile.name.replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `ProgressCard_${safeName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('PNG downloaded!', 'success');
    }).catch(err => {
      console.error("PNG export error:", err);
      showToast('Export failed — check console', '');
    }).finally(() => {
      btn.innerHTML = origText;
      btn.disabled = false;
    });
  }

  /* ═══════════════════════════════════════════════════
     EXPORT: CLIPBOARD
     ═══════════════════════════════════════════════════ */
  function copyCardImage() {
    const wrap = document.getElementById('capture-wrap');
    const bgColor = state.theme.bg || '#060a12';

    html2canvas(wrap, {
      scale: 2.5,
      backgroundColor: bgColor,
      useCORS: true,
      allowTaint: true,
      logging: false,
      onclone: function(clonedDoc) {
        const clonedWrap = clonedDoc.getElementById('capture-wrap');
        if (clonedWrap) {
          clonedWrap.style.background = bgColor;
          const card = clonedWrap.querySelector('.card');
          if (card) { card.style.backdropFilter = 'none'; card.style.webkitBackdropFilter = 'none'; }
          // Fix html2canvas bug with gradient text
          const titleEl = clonedWrap.querySelector('.title');
          if (titleEl) {
            titleEl.style.background = 'none';
            titleEl.style.webkitBackgroundClip = 'initial';
            titleEl.style.webkitTextFillColor = 'initial';
            titleEl.style.color = state.theme.t1;
          }
        }
      }
    }).then(canvas => {
      canvas.toBlob(blob => {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]).then(() => {
          showToast('Copied to clipboard! Paste anywhere.', 'success');
        }).catch(() => {
          showToast('Clipboard blocked by browser. Download PNG instead.', '');
        });
      }, 'image/png');
    }).catch(err => {
      console.error(err);
      showToast('Failed to copy', '');
    });
  }

  /* ═══════════════════════════════════════════════════
     EXPORT: STANDALONE HTML
     ═══════════════════════════════════════════════════ */
  function exportCleanHTML() {
    const cardContent = document.getElementById('preview-card').outerHTML;
    const t = state.theme;
    const [ar,ag,ab] = hexToRgb(t.accent);
    const [lr,lg,lb] = hexToRgb(t.accentLight);

    const cleanHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${state.header.weekText} — ${state.profile.name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    :root{
      --bg:${t.bg};--accent:${t.accent};--accent-light:${t.accentLight};
      --accent-5:rgba(${ar},${ag},${ab},0.05);--accent-7:rgba(${ar},${ag},${ab},0.07);
      --accent-8:rgba(${ar},${ag},${ab},0.08);--accent-10:rgba(${ar},${ag},${ab},0.10);
      --accent-12:rgba(${ar},${ag},${ab},0.12);--accent-15:rgba(${ar},${ag},${ab},0.15);
      --accent-25:rgba(${ar},${ag},${ab},0.25);--accent-28:rgba(${ar},${ag},${ab},0.28);
      --accent-30:rgba(${ar},${ag},${ab},0.30);
      --orb1:${t.orb1};--orb2:${t.orb2};--orb3:${t.orb3};
      --border:rgba(255,255,255,0.08);--t1:${t.t1};--t2:${t.t2};--t3:${t.t3};
    }
    body{font-family:'Inter',sans-serif;background:var(--bg);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:28px 20px;color:var(--t1);}
    .orb{position:fixed;border-radius:50%;pointer-events:none;filter:blur(80px);z-index:-1;}
    .orb1{width:420px;height:420px;background:var(--orb1);top:-80px;right:-80px;}
    .orb2{width:350px;height:350px;background:var(--orb2);bottom:-60px;left:-60px;}
    .orb3{width:280px;height:280px;background:var(--orb3);bottom:20%;right:10%;}
    .card{width:100%;max-width:760px;background:linear-gradient(150deg,rgba(255,255,255,0.05)0%,rgba(255,255,255,0.02)100%);border:1px solid var(--border);border-radius:24px;padding:32px 36px 28px;position:relative;backdrop-filter:blur(20px);box-shadow:0 30px 70px rgba(0,0,0,0.55),0 0 0 1px rgba(255,255,255,0.03)inset;}
    .card::before{content:'';position:absolute;top:0;left:40px;right:40px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);}
    .header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
    .week-pill{display:inline-flex;align-items:center;gap:6px;background:var(--accent-12);border:1px solid var(--accent-28);color:var(--accent-light);font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:4px 12px;border-radius:99px;}
    .week-pill::before{content:'●';font-size:6px;animation:blink 2s infinite;}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
    .date{font-family:'JetBrains Mono',monospace;font-size:11.5px;color:var(--t3);letter-spacing:.04em;}
    .title{font-size:26px;font-weight:800;letter-spacing:-.025em;line-height:1.2;background:linear-gradient(130deg,var(--t1)40%,var(--t2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
    .subtitle{font-size:12.5px;color:var(--t2);margin-top:4px;}.subtitle b{color:var(--accent-light);font-weight:600;}
    .hr{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent);margin:20px 0;}
    .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:20px;}
    .stat{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:13px 14px;position:relative;overflow:hidden;}
    .stat::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;border-radius:14px 14px 0 0;}
    .stat.java::before{background:linear-gradient(90deg,#f89820,#fcd34d);box-shadow:0 0 10px rgba(248,152,32,.5);}
    .stat.lc::before{background:linear-gradient(90deg,#ffa116,#fb923c);box-shadow:0 0 10px rgba(255,161,22,.5);}
    .stat.green::before{background:linear-gradient(90deg,#22c55e,#4ade80);box-shadow:0 0 10px rgba(34,197,94,.5);}
    .stat.blue::before{background:linear-gradient(90deg,#3b82f6,#818cf8);box-shadow:0 0 10px rgba(59,130,246,.5);}
    .stat.pink::before{background:linear-gradient(90deg,#ec4899,#f472b6);box-shadow:0 0 10px rgba(236,72,153,.5);}
    .stat.purple::before{background:linear-gradient(90deg,#a855f7,#c084fc);box-shadow:0 0 10px rgba(168,85,247,.5);}
    .stat.cyan::before{background:linear-gradient(90deg,#06b6d4,#22d3ee);box-shadow:0 0 10px rgba(6,182,212,.5);}
    .stat.red::before{background:linear-gradient(90deg,#ef4444,#f87171);box-shadow:0 0 10px rgba(239,68,68,.5);}
    .stat.amber::before{background:linear-gradient(90deg,#f59e0b,#fbbf24);box-shadow:0 0 10px rgba(245,158,11,.5);}
    .stat.teal::before{background:linear-gradient(90deg,#14b8a6,#2dd4bf);box-shadow:0 0 10px rgba(20,184,166,.5);}
    .stat-lbl{font-size:9.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--t3);margin-bottom:4px;}
    .stat-val{font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:700;line-height:1.1;}
    .stat.java .stat-val{color:#f89820;}.stat.lc .stat-val{color:#ffa116;}.stat.green .stat-val{color:#22c55e;}.stat.blue .stat-val{color:#3b82f6;}.stat.pink .stat-val{color:#ec4899;}.stat.purple .stat-val{color:#a855f7;}.stat.cyan .stat-val{color:#06b6d4;}.stat.red .stat-val{color:#ef4444;}.stat.amber .stat-val{color:#f59e0b;}.stat.teal .stat-val{color:#14b8a6;}
    .stat-sub{font-size:10px;color:var(--t3);margin-top:3px;}
    .panels-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;margin-bottom:20px;}
    .panel{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:16px 18px;}
    .panel-title{font-size:9.5px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--t3);display:flex;align-items:center;gap:8px;margin-bottom:12px;}
    .panel-title .dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
    .prow{display:flex;align-items:center;gap:10px;margin-bottom:9px;}.prow:last-child{margin-bottom:0;}
    .plabel{font-size:11px;font-weight:600;color:var(--t1);min-width:108px;white-space:nowrap;display:flex;align-items:center;gap:4px;}
    .ptrack{flex:1;height:5px;background:rgba(255,255,255,0.05);border-radius:99px;overflow:hidden;}
    .pfill{height:100%;border-radius:99px;}
    .pfill.done-java{background:linear-gradient(90deg,#f89820,#fcd34d);}.pfill.done-green{background:linear-gradient(90deg,#22c55e,#4ade80);}.pfill.done-purple{background:linear-gradient(90deg,#a855f7,#c084fc);}.pfill.done-blue{background:linear-gradient(90deg,#3b82f6,#818cf8);}.pfill.done-pink{background:linear-gradient(90deg,#ec4899,#f472b6);}.pfill.done-cyan{background:linear-gradient(90deg,#06b6d4,#22d3ee);}.pfill.done-red{background:linear-gradient(90deg,#ef4444,#f87171);}.pfill.done-amber{background:linear-gradient(90deg,#f59e0b,#fbbf24);}.pfill.done-teal{background:linear-gradient(90deg,#14b8a6,#2dd4bf);}.pfill.partial{background:linear-gradient(90deg,#6366f1,#818cf8);}.pfill.none{background:rgba(255,255,255,0.07);}
    .pbadge{font-size:10px;min-width:22px;text-align:right;}.pbadge.ok{color:#22c55e;}.pbadge.wip{font-family:'JetBrains Mono',monospace;color:#a78bfa;font-size:9px;}.pbadge.no{color:var(--t3);}
    .new-tag{font-size:8.5px;font-weight:700;padding:1px 6px;border-radius:99px;background:var(--accent-15);border:1px solid var(--accent-30);color:var(--accent-light);letter-spacing:.04em;display:inline-block;}
    .chips-section{margin-bottom:18px;}.chips-label{font-size:9.5px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--t3);margin-bottom:10px;}
    .chips{display:flex;flex-wrap:wrap;gap:6px;}.chip{font-size:10.5px;font-weight:600;padding:3px 10px;border-radius:99px;border:1px solid;}
    .chip.g{background:rgba(34,197,94,.07);border-color:rgba(34,197,94,.22);color:#4ade80;}.chip.b{background:rgba(59,130,246,.07);border-color:rgba(59,130,246,.22);color:#60a5fa;}.chip.p{background:var(--accent-8);border-color:var(--accent-25);color:var(--accent-light);}.chip.p::before{content:'✦ ';font-size:8px;}.chip.o{background:rgba(248,152,32,.07);border-color:rgba(248,152,32,.22);color:#fbbf24;}.chip.r{background:rgba(239,68,68,.07);border-color:rgba(239,68,68,.22);color:#f87171;}.chip.c{background:rgba(6,182,212,.07);border-color:rgba(6,182,212,.22);color:#22d3ee;}.chip.k{background:rgba(236,72,153,.07);border-color:rgba(236,72,153,.22);color:#f472b6;}
    .quote{background:linear-gradient(135deg,var(--accent-7),var(--accent-5));border:1px solid var(--accent-12);border-radius:12px;padding:11px 18px;font-size:12px;color:var(--accent-light);font-style:italic;text-align:center;line-height:1.55;margin-bottom:20px;}.quote b{color:var(--accent);font-style:normal;font-weight:700;}
    .footer{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;}.fl{display:flex;align-items:center;gap:10px;}
    .avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent-light));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;color:#fff;flex-shrink:0;}
    .fname{font-size:13px;font-weight:700;color:var(--t1);line-height:1.2;}.fhandle{font-size:10.5px;color:var(--t3);font-family:'JetBrains Mono',monospace;}
    .social-row{display:flex;align-items:center;gap:5px;margin-top:3px;flex-wrap:wrap;}
    .social-icon-card{font-size:8.5px;font-weight:700;padding:2px 6px;border-radius:4px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:var(--t2);letter-spacing:0.02em;display:inline-flex;align-items:center;gap:3px;}
    .social-icon-card.li{background:rgba(10,102,194,0.08);border-color:rgba(10,102,194,0.18);color:#60a5fa;}
    .social-icon-card.tw{background:rgba(29,155,240,0.08);border-color:rgba(29,155,240,0.18);color:#38bdf8;}
    .social-icon-card.em{background:rgba(34,197,94,0.08);border-color:rgba(34,197,94,0.18);color:#4ade80;}
    .social-icon-card.wb{background:rgba(168,85,247,0.08);border-color:rgba(168,85,247,0.18);color:#c084fc;}
    .badges{display:flex;gap:6px;flex-wrap:wrap;}.badge{font-size:10px;font-weight:700;padding:4px 10px;border-radius:99px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.03);color:var(--t2);display:flex;align-items:center;gap:4px;}.badge span{font-size:12px;}
    @media(max-width:640px){.card{padding:20px 20px 18px;}.stats{grid-template-columns:1fr 1fr;}.panels-grid{grid-template-columns:1fr;}}
  </style>
</head>
<body>
  <div class="orb orb1"></div><div class="orb orb2"></div><div class="orb orb3"></div>
  ${cardContent}
  <script type="application/json" id="progress-card-state">
    ${JSON.stringify(state)}
  </script>
</body>
</html>`;

    const blob = new Blob([cleanHTML], { type: 'text/html' });
    const link = document.createElement('a');
    const safeName = state.profile.name.replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `ProgressCard_${safeName}.html`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    showToast('HTML exported!', 'success');
  }

  // --- LOAD HTML FEATURE ---
  function handleHtmlUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      const htmlText = e.target.result;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      
      const stateScript = doc.getElementById('progress-card-state');
      if (stateScript) {
        try {
          const loadedState = JSON.parse(stateScript.textContent);
          
          // Basic validation
          if (loadedState && loadedState.profile && loadedState.theme) {
            state = JSON.parse(JSON.stringify(loadedState));
            saveState();
            
            // Refresh everything
            updateFormFields();
            renderThemeColors();
            renderCard();
            
            showToast('Card loaded successfully!', 'success');
          } else {
            showToast('Invalid state format in HTML.', '');
          }
        } catch (err) {
          console.error("Error parsing state:", err);
          showToast('Failed to parse saved state.', '');
        }
      } else {
        showToast('No save data found in this HTML file.', '');
      }
      
      event.target.value = ''; // Reset input
    };
    
    reader.readAsText(file);
  }

  /* ═══════════════════════════════════════════════════
     KEYBOARD SHORTCUT — Escape closes modal
     ═══════════════════════════════════════════════════ */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeTemplateModal();
  });

  // Boot
  window.onload = init;