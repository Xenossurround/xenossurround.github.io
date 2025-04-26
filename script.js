// 示例资源数据
const resources = [
  {
    id: 1,
    title: 'Photoshop 2024 绿色版',
    desc: '功能强大的图像处理工具，支持多种插件和扩展。',
    img: 'https://cdn.pixabay.com/photo/2017/01/10/19/05/blur-1972566_1280.jpg',
    type: '软件',
    size: '1.2GB',
    date: '2025-04-17',
    download: 'https://example.com/downloads/photoshop2024.zip'
  },
  {
    id: 2,
    title: '高分辨率壁纸包',
    desc: '100+张精选4K高清壁纸，适用于电脑和手机。',
    img: 'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg',
    type: '图片',
    size: '240MB',
    date: '2025-03-30',
    download: 'https://example.com/downloads/wallpapers.zip'
  },
  {
    id: 3,
    title: 'Pr模板合集',
    desc: '适用于Adobe Premiere的多功能视频模板，提升剪辑效率。',
    img: 'https://cdn.pixabay.com/photo/2016/11/29/09/08/video-1867280_1280.jpg',
    type: '视频',
    size: '980MB',
    date: '2025-02-21',
    download: 'https://example.com/downloads/pr-templates.zip'
  },
  {
    id: 4,
    title: 'Python学习电子书',
    desc: '系统讲解Python编程，适合新手入门到进阶。',
    img: 'https://cdn.pixabay.com/photo/2015/05/31/10/55/book-791201_1280.jpg',
    type: '书籍',
    size: '32MB',
    date: '2025-01-10',
    download: 'https://example.com/downloads/python-ebook.pdf'
  },
  {
    id: 5,
    title: 'AI写作工具',
    desc: '智能辅助写作，支持中文、英文多语言，提升写作效率。',
    img: 'https://cdn.pixabay.com/photo/2017/01/10/19/05/laptop-1972616_1280.jpg',
    type: '工具',
    size: '17MB',
    date: '2025-04-11',
    download: 'https://example.com/downloads/aiwriter.exe'
  },
  {
    id: 6,
    title: '最新编程字体包',
    desc: '收录20+专为编程优化的字体，提升代码可读性。',
    img: 'https://cdn.pixabay.com/photo/2014/09/23/18/40/code-457070_1280.jpg',
    type: '字体',
    size: '7MB',
    date: '2025-02-14',
    download: 'https://example.com/downloads/fonts.zip'
  },
  {
    id: 7,
    title: '网站前端模板',
    desc: '响应式设计，多风格选择，适合快速建站。',
    img: 'https://cdn.pixabay.com/photo/2015/01/08/18/26/startup-593327_1280.jpg',
    type: '模板',
    size: '11MB',
    date: '2025-04-01',
    download: 'https://example.com/downloads/web-templates.zip'
  },
  {
    id: 8,
    title: '精品PPT模板',
    desc: '高端商务&教育PPT模板合集，轻松制作演示文稿。',
    img: 'https://cdn.pixabay.com/photo/2017/08/01/00/35/people-2569234_1280.jpg',
    type: '模板',
    size: '28MB',
    date: '2025-03-18',
    download: 'https://example.com/downloads/ppt-templates.zip'
  },
  {
    id: 9,
    title: '高质量音效包',
    desc: '适用于视频、游戏、动画制作的音效资源，大量无版权音效。',
    img: 'https://cdn.pixabay.com/photo/2016/03/23/18/41/sound-1271741_1280.jpg',
    type: '音频',
    size: '210MB',
    date: '2025-02-27',
    download: 'https://example.com/downloads/sound-effects.zip'
  },
  {
    id: 10,
    title: '数学公式编辑器',
    desc: '轻松编辑复杂数学公式，支持LaTeX导出。',
    img: 'https://cdn.pixabay.com/photo/2017/01/10/19/05/blur-1972566_1280.jpg',
    type: '工具',
    size: '5MB',
    date: '2025-01-20',
    download: 'https://example.com/downloads/math-editor.exe'
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
  modalDownload.href = res.download;
  modalDownload.setAttribute('download', res.title);
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
