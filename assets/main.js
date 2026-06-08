/* ========================================
   MathNav - 全局脚本
   ======================================== */

// ===== 模块折叠 =====
function toggleModule(header) {
  const body = header.nextElementSibling;
  const arrow = header.querySelector('.arrow');
  if (!body || !arrow) return;
  body.classList.toggle('hidden');
  arrow.classList.toggle('open');
}

// ===== 复选框 =====
function toggleCheck(el) {
  el.classList.toggle('checked');
}

// ===== 薄弱详情显示 =====
function showWeakness(id, btn) {
  const detail = document.getElementById(id);
  if (!detail) return;

  const isOpen = detail.classList.contains('open');

  // 关闭所有其他详情
  document.querySelectorAll('.weakness-detail').forEach(d => d.classList.remove('open'));

  if (!isOpen) {
    detail.classList.add('open');
    detail.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 展开父模块
    const module = detail.closest('.module');
    if (module) {
      const body = module.querySelector('.module-body');
      const arrow = module.querySelector('.arrow');
      if (body) body.classList.remove('hidden');
      if (arrow) arrow.classList.add('open');
    }
  }
}

// ===== 关闭薄弱详情 =====
function closeWeakness(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

// ===== URL 锚点自动展开 =====
document.addEventListener('DOMContentLoaded', function() {
  // 如果 URL 有 hash，展开对应模块并滚动
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      // 展开所在模块
      const module = target.closest('.module');
      if (module) {
        const body = module.querySelector('.module-body');
        const arrow = module.querySelector('.arrow');
        if (body) body.classList.remove('hidden');
        if (arrow) arrow.classList.add('open');
      }
      // 如果是薄弱详情，展开它
      if (target.classList.contains('weakness-detail')) {
        target.classList.add('open');
      }
      setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }
  }

  // 侧边栏点击薄弱项
  document.querySelectorAll('.weakness-item').forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.dataset.target;
      if (target) showWeakness(target, this);
    });
  });
});

// ===== 搜索过滤 =====
function filterTopics() {
  const q = document.getElementById('search');
  if (!q) return;
  const query = q.value.trim().toLowerCase();
  const allTopics = document.querySelectorAll('.topic');
  const modules = document.querySelectorAll('.module');

  if (!query) {
    allTopics.forEach(t => {
      t.classList.remove('search-hidden');
      const textEl = t.querySelector('.text');
      if (textEl) textEl.innerHTML = textEl.textContent;
    });
    modules.forEach(m => m.classList.remove('search-hidden'));
    return;
  }

  allTopics.forEach(topic => {
    const textEl = topic.querySelector('.text');
    if (!textEl) return;
    const text = textEl.textContent.toLowerCase();
    if (text.includes(query)) {
      topic.classList.remove('search-hidden');
      const original = textEl.textContent;
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      textEl.innerHTML = original.replace(regex, '<mark class="highlight">$1</mark>');
    } else {
      topic.classList.add('search-hidden');
    }
  });

  modules.forEach(m => {
    const visibleTopics = m.querySelectorAll('.topic:not(.search-hidden)');
    const hasOpenWeakness = m.querySelector('.weakness-detail.open');
    if (visibleTopics.length === 0 && !hasOpenWeakness) {
      m.classList.add('search-hidden');
    } else {
      m.classList.remove('search-hidden');
    }
  });
}
