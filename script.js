// 新的资源数据（封面取自B站指定视频）
const resources = [
  {
    id: 1,
    title: '2D物理引擎',
    desc: '简单易上手的2D物理引擎，适合学习和二次开发，支持碰撞、重力等基础功能。',
    // 替换为B站视频BV号的封面。示例BV号：BV1hJ411g7XF
    img: 'https://i0.hdslb.com/bfs/archive/3db7d7e9685c8a4ffb23b4e4fd20a9e1920fbe7a.jpg', // 替换为你想要的视频封面
    type: '引擎',
    size: '224kb',
    date: '2025-03-01',
    downloadLinks: [
      { label: '链接一(123pan)', url: 'https://www.123912.com/s/5F9LVv-FaI7' },
      { label: '链接二(Github)', url: 'https://github.com/Xenossurround/Simple-2D-Physics-Engine' }
    ]
  },
  {
    id: 2,
    title: '简易画图软件',
    desc: '基于Easyx的简易画图软件，支持多种画笔与图形，适合教学和演示。',
    // 另一个B站视频BV号封面，示例BV号：BV1Qy4y1C7bS
    img: 'https://i1.hdslb.com/bfs/archive/38d3e605ae5e75a02ffb62a1c1d5c93d3536bc3a.jpg', // 替换为你想要的视频封面
    type: '软件',
    size: '537kb',
    date: '2025-04-17',
    downloadLinks: [
      { label: '链接一', url: 'https://github.com/Xenossurround/Simple-Drawer' }
    ]
  },
  {
    id: 3,
    title: 'AI敌人逻辑实现',
    desc: '游戏开发常用的AI敌人行为逻辑实现示例，包括巡逻、追击等智能行为。',
    // 另一个B站视频BV号封面，示例BV号：BV1X4411H7WD
    img: 'https://i0.hdslb.com/bfs/archive/fc2ee1b9a5e2f2b4a8f9f6d8a5d0b9c0c4f6e9d2.jpg', // 替换为你想要的视频封面
    type: '算法',
    size: '2.1MB',
    date: '2025-04-17',
    downloadLinks: [
      { label: '链接一', url: 'https://github.com/Xenossurround/AIEnemy' }
    ]
  }
];

const pageSize = 6;
let currentPage = 1;
let filteredResources = resources;

// 渲染资源卡片
function renderResources(page = 1) {
  const list = document.getElementById('resource-list');
  list.innerHTML = '';
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = filteredResources.slice(start, end);

  if(data.length === 0) {
    list.innerHTML = '<div style="text-align:center;color:#888;padding:2em 0;">未找到资源</div>';
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  data.forEach(res => {
    const card = document.createElement('div');
    card.className = 'resource-card';
    card.innerHTML = `
      <img src="${res.img}" alt="${res.title}" class="resource-img">
      <div class="resource-info">
        <div class="resource-title">${res.title}</div>
        <div class="resource-desc">${res.desc}</div>
        <div class="resource-meta">
          <span>类型：${res.type}</span>
          <span>大小：${res.size}</span>
        </div>
        <div class="resource-meta">
          <span>更新：${res.date}</span>
          <a href="#" class="download-btn" data-id="${res.id}">下载</a>
        </div>
      </div>
    `;
    card.querySelector('.download-btn').addEventListener('click', e => {
      e.preventDefault();
      showModal(res);
    });
    card.addEventListener('click', e => {
      if (!e.target.classList.contains('download-btn')) showModal(res);
    });
    list.appendChild(card);
  });

  renderPagination(page);
}

// 渲染分页
function renderPagination(page = 1) {
  const total = Math.ceil(filteredResources.length / pageSize);
  const pag = document.getElementById('pagination');
  pag.innerHTML = '';
  if(total <= 1) return;

  for(let i=1; i<=total; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if(page === i) btn.classList.add('active');
    btn.addEventListener('click', () => {
      currentPage = i;
      renderResources(i);
      window.scrollTo({ top: document.querySelector(".resources").offsetTop - 80, behavior: 'smooth' });
    });
    pag.appendChild(btn);
  }
}

// 搜索功能
document.getElementById('search-form').addEventListener('submit', function(e){
  e.preventDefault();
  const val = document.getElementById('search-input').value.trim();
  if(val) {
    filteredResources = resources.filter(r => (
      r.title.includes(val) || r.desc.includes(val) || r.type.includes(val)
    ));
  } else {
    filteredResources = resources;
  }
  currentPage = 1;
  renderResources(1);
});

// 模态框
function showModal(res) {
  document.getElementById('modal-title').textContent = res.title;
  document.getElementById('modal-desc').textContent = res.desc + '\n\n类型：' + res.type + '  |  大小：' + res.size + '  |  更新：' + res.date;
  const modalDownload = document.getElementById('modal-download');
  // 多下载链接
  if(res.downloadLinks && res.downloadLinks.length > 0){
    let html = '';
    res.downloadLinks.forEach(link => {
      html += `<a href="${link.url}" class="download-btn" target="_blank" style="display:block;margin-bottom:10px;">${link.label}</a>`;
    });
    modalDownload.style.display = 'none';
    if(!document.getElementById('modal-download-links')) {
      const container = document.createElement('div');
      container.id = 'modal-download-links';
      container.innerHTML = html;
      modalDownload.parentNode.insertBefore(container, modalDownload.nextSibling);
    } else {
      document.getElementById('modal-download-links').innerHTML = html;
      document.getElementById('modal-download-links').style.display = 'block';
    }
  } else {
    modalDownload.style.display = 'inline-block';
    modalDownload.href = res.download;
    modalDownload.setAttribute('download', res.title);
    if(document.getElementById('modal-download-links')) {
      document.getElementById('modal-download-links').style.display = 'none';
    }
  }
  document.getElementById('modal').style.display = 'flex';
}
document.getElementById('modal-close').onclick = () => {
  document.getElementById('modal').style.display = 'none';
};
// 点击模态框外关闭
window.onclick = function(event) {
  if(event.target === document.getElementById('modal')) {
    document.getElementById('modal').style.display = 'none';
  }
};

// 联系表单动画模拟
document.querySelector('.contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '发送中...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '发送';
    btn.disabled = false;
    this.reset();
    alert('感谢您的留言，我们会尽快与您联系！');
  }, 1200);
});

// 页面导航动画
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e){
    if(this.getAttribute('href').startsWith('#')){
      e.preventDefault();
      document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
      this.classList.add('active');
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
      }
    }
  });
});

// 初始渲染
renderResources(1);
