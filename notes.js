<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Математика — Справочник</title>
<style>
  :root {
    --text: #1e293b;
    --text-muted: #64748b;
    --accent: #3b82f6;
    --glass-bg: rgba(255, 255, 255, 0.45);
    --glass-border: rgba(255, 255, 255, 0.8);
    --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
    --line-color: #94a3b8;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: var(--text);
    display: flex;
    height: 100vh;
    overflow: hidden;
    background-color: #e2e8f0;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.2) 0%, transparent 50%);
    background-attachment: fixed;
  }

  .tree-wrapper {
    width: 100%;
    max-width: 100%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    transition: max-width 0.6s cubic-bezier(0.4, 0, 0.2, 1), padding 0.6s ease;
  }
  
  body.content-open .tree-wrapper {
    max-width: 480px;
    padding: 20px;
  }

  .tree-container {
    flex: 1;
    padding: 40px;
    background: var(--glass-bg);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border: 1px solid var(--glass-border);
    border-radius: 40px;
    box-shadow: var(--glass-shadow);
    position: relative;
    overflow-y: auto;
    overflow-x: hidden; 
    display: flex;
    flex-direction: column;
  }

  .search-box { margin-bottom: 20px; position: relative; }
  .search-box input {
    width: 100%;
    padding: 12px 20px;
    font-size: 1rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.7);
    color: var(--text);
    outline: none;
    transition: 0.3s;
    font-family: inherit;
  }
  .search-box input:focus {
    background: #fff;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
    border-color: var(--accent);
  }

  .tree-root { display: flex; flex-direction: column; gap: 8px; }
  .tree-node { position: relative; display: flex; flex-direction: column; }

  .node-content {
    display: inline-flex;
    align-items: center;
    padding: 10px 16px;
    cursor: pointer;
    user-select: none;
    font-weight: 600;
    color: var(--text);
    transition: 0.2s;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    width: fit-content;
    position: relative;
    z-index: 2;
  }
  
  .node-content:hover { 
    background: #ffffff;
    border-color: rgba(59, 130, 246, 0.4);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  }

  .tree-node.hidden { display: none !important; }

  .arrow-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    font-size: 0.7rem;
    color: var(--text-muted);
    transition: transform 0.3s ease;
  }
  .tree-node.expanded > .node-content > .arrow-icon {
    transform: rotate(90deg);
    color: var(--accent);
  }

  .tree-children {
    display: none;
    position: relative;
    margin-left: 20px; 
    padding-left: 30px; 
    flex-direction: column;
    gap: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  
  .tree-node.expanded > .tree-children {
    display: flex;
    animation: fadeIn 0.3s ease-out forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateX(-5px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .tree-children::before {
    content: '';
    position: absolute;
    left: 0;
    top: 24px;
    bottom: 24px;
    width: 2px;
    background: var(--line-color);
    z-index: 0;
  }

  .tree-children > .tree-node::before {
    content: '';
    position: absolute;
    left: -30px;
    top: 24px;
    width: 30px;
    height: 2px;
    background: var(--line-color);
    z-index: 0;
  }

  .tree-children > .tree-node:last-child::after {
    content: '';
    position: absolute;
    left: -32px;
    top: 25px;
    bottom: 0;
    width: 2px;
    background: var(--glass-bg);
    z-index: 0;
  }

  .level-1 > .node-content { font-weight: 800; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; background: rgba(255,255,255,0.9); }
  .level-2 > .node-content { font-weight: 700; font-size: 1.05rem; }
  .level-3 > .node-content { font-weight: 500; font-size: 0.95rem; color: var(--text-muted); }

  .tree-node.active > .node-content {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);
    box-shadow: 0 6px 20px rgba(59,130,246,0.4);
  }
  .tree-node.active > .node-content .arrow-icon { color: #fff; }

  .desktop-reset-btn {
    position: fixed;
    top: 20px;
    left: 20px;
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 12px 24px;
    border-radius: 100px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(59,130,246,0.4);
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0;
    transform: translateY(-20px);
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .desktop-reset-btn:hover {
    background: #2563eb;
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 20px rgba(59,130,246,0.6);
  }
  .desktop-reset-btn:active { transform: scale(0.95) !important; }

  body.content-open .desktop-reset-btn {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: auto;
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  body.content-open .main-content {
    opacity: 1;
    transform: translateX(0);
    transition-delay: 0.4s;
  }

  .content-wrapper {
    max-width: 900px;
    margin: 40px auto;
    padding: 60px;
    background: var(--glass-bg);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border: 1px solid var(--glass-border);
    border-radius: 40px;
    box-shadow: var(--glass-shadow);
    width: calc(100% - 40px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .content-wrapper.fade-out { opacity: 0; transform: translateY(10px); }

  .topic-header { margin-bottom: 40px; border-bottom: 2px solid rgba(0,0,0,0.05); padding-bottom: 20px; }
  .breadcrumbs {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
  }
  .topic-header h1 { font-size: 2.6rem; font-weight: 800; letter-spacing: -0.02em; line-height: 1.2; color: #0f172a; }
  
  .topic-body { line-height: 1.8; font-size: 1.1rem; color: #334155; font-family: 'Georgia', serif; }
  .topic-body h3 { margin: 40px 0 16px; font-size: 1.3rem; font-weight: 700; text-transform: uppercase; font-family: 'Helvetica Neue', Arial, sans-serif; color: #0f172a; }
  .topic-body p { margin-bottom: 20px; }
  .topic-body b { color: #0f172a; }
  
  .formula {
    background: rgba(255, 255, 255, 0.5);
    padding: 20px 24px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-left: 4px solid var(--accent);
    border-radius: 12px;
    font-family: 'Courier New', monospace;
    font-size: 1.2rem;
    margin: 24px 0;
    font-weight: 700;
    text-align: center;
    color: #0f172a;
    box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  }
  
  .topic-body ul, .topic-body ol { margin: 20px 0 20px 24px; }
  .topic-body li { margin-bottom: 12px; }
  
  .example {
    background: rgba(239, 246, 255, 0.5);
    border: 1px solid rgba(59, 130, 246, 0.2);
    padding: 20px 24px;
    border-radius: 16px;
    margin: 28px 0;
  }
  .example-title {
    font-weight: 800;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    margin-bottom: 10px;
    color: var(--accent);
    font-size: 0.85rem;
    text-transform: uppercase;
  }

  .loading-text {
    color: var(--text-muted);
    font-size: 1.2rem;
    font-style: italic;
    text-align: center;
    margin-top: 50px;
  }

  @media (max-width: 768px) {
    body { flex-direction: column; overflow: auto; height: auto; }
    .tree-wrapper { width: 100%; padding: 16px; min-height: 100vh; margin: 0; }
    body.content-open .tree-wrapper { display: none; }
    .tree-container { padding: 20px; border-radius: 24px; }
    .main-content {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      transform: translateY(100%); z-index: 100; transition-delay: 0s !important;
      background: rgba(255, 255, 255, 0.95);
      overflow-y: auto;
    }
    body.content-open .main-content { transform: translateY(0); }
    .content-wrapper { padding: 30px 20px; margin: 20px auto; border-radius: 24px; }
    .topic-header h1 { font-size: 2rem; }
    .mobile-back { display: block; margin-bottom: 20px; background: none; border: none; font-size: 1rem; font-weight: 600; cursor: pointer; color: var(--text-muted); }
    .desktop-reset-btn { display: none !important; }
  }
  @media (min-width: 769px) {
    .mobile-back { display: none; }
  }
</style>
</head>
<body>

  <button class="desktop-reset-btn" onclick="closeContent()">
    <span>←</span> К дереву
  </button>

  <div class="tree-wrapper">
    <div class="tree-container">
      <div class="search-box">
        <input type="text" id="searchInput" placeholder="Поиск по темам...">
      </div>
      <div class="tree-root" id="treeContainer"></div>
    </div>
  </div>

  <main class="main-content" id="mainContent">
    <div class="content-wrapper" id="contentWrapper"></div>
  </main>

  <script src="notes.js"></script>

<script>
  // ВНИМАНИЕ: Тут только структура (id и title). Тексты лежат в notes.js
  const mathData = [
    {
      id: 'algebra',
      title: 'Алгебра',
      children: [
        {
          id: 'alg-7',
          title: '7 класс',
          children: [
            { id: 'alg-7-1', title: 'Числовые и алгебраические выражения' },
            { id: 'alg-7-2', title: 'Линейные уравнения' },
            { id: 'alg-7-3', title: 'Решение задач с помощью уравнений' },
            { id: 'alg-7-4', title: 'Функции и их графики' },
            { id: 'alg-7-5', title: 'Линейная функция' },
            { id: 'alg-7-6', title: 'Степень с натуральным показателем' },
            { id: 'alg-7-7', title: 'Одночлены и многочлены' },
            { id: 'alg-7-8', title: 'Формулы сокращённого умножения' }
          ]
        },
        {
          id: 'alg-8',
          title: '8 класс',
          children: [
            { id: 'alg-8-1', title: 'Рациональные дроби' },
            { id: 'alg-8-2', title: 'Квадратные корни' },
            { id: 'alg-8-3', title: 'Квадратные уравнения' },
            { id: 'alg-8-4', title: 'Теорема Виета' },
            { id: 'alg-8-5', title: 'Дробно-рациональные уравнения' },
            { id: 'alg-8-6', title: 'Квадратичная функция' },
            { id: 'alg-8-7', title: 'Неравенства' }
          ]
        },
        {
          id: 'alg-9',
          title: '9 класс',
          children: [
            { id: 'alg-9-1', title: 'Свойства функций' },
            { id: 'alg-9-2', title: 'Квадратные неравенства' },
            { id: 'alg-9-3', title: 'Системы уравнений' },
            { id: 'alg-9-4', title: 'Арифметическая прогрессия' },
            { id: 'alg-9-5', title: 'Геометрическая прогрессия' },
            { id: 'alg-9-6', title: 'Элементы комбинаторики' },
            { id: 'alg-9-7', title: 'Степенная функция' }
          ]
        },
        {
          id: 'alg-10',
          title: '10 класс',
          children: [
            { id: 'alg-10-1', title: 'Тригонометрические функции' },
            { id: 'alg-10-2', title: 'Тригонометрические тождества' },
            { id: 'alg-10-3', title: 'Тригонометрические уравнения' },
            { id: 'alg-10-4', title: 'Корень n-й степени' },
            { id: 'alg-10-5', title: 'Степенная функция и её график' },
            { id: 'alg-10-6', title: 'Показательная функция' },
            { id: 'alg-10-7', title: 'Показательные уравнения' },
            { id: 'alg-10-8', title: 'Логарифмы' }
          ]
        },
        {
          id: 'alg-11',
          title: '11 класс',
          children: [
            { id: 'alg-11-1', title: 'Предел функции' },
            { id: 'alg-11-2', title: 'Производная' },
            { id: 'alg-11-3', title: 'Правила дифференцирования' },
            { id: 'alg-11-4', title: 'Применение производной' },
            { id: 'alg-11-5', title: 'Касательная к графику' },
            { id: 'alg-11-6', title: 'Первообразная и интеграл' },
            { id: 'alg-11-7', title: 'Формула Ньютона-Лейбница' },
            { id: 'alg-11-8', title: 'Элементы теории вероятностей' }
          ]
        }
      ]
    },
    {
      id: 'geometry',
      title: 'Геометрия',
      children: [
        {
          id: 'geo-7',
          title: '7 класс',
          children: [
            { id: 'geo-7-1', title: 'Начальные геометрические сведения' },
            { id: 'geo-7-2', title: 'Треугольники' },
            { id: 'geo-7-3', title: 'Медианы, биссектрисы и высоты' },
            { id: 'geo-7-4', title: 'Равнобедренный треугольник' },
            { id: 'geo-7-5', title: 'Параллельные прямые' },
            { id: 'geo-7-6', title: 'Соотношения между сторонами и углами' }
          ]
        },
        {
          id: 'geo-8',
          title: '8 класс',
          children: [
            { id: 'geo-8-1', title: 'Четырёхугольники' },
            { id: 'geo-8-2', title: 'Трапеция' },
            { id: 'geo-8-3', title: 'Теорема Пифагора' },
            { id: 'geo-8-4', title: 'Площади фигур' },
            { id: 'geo-8-5', title: 'Подобие треугольников' },
            { id: 'geo-8-6', title: 'Вписанная и описанная окружность' }
          ]
        },
        {
          id: 'geo-9',
          title: '9 класс',
          children: [
            { id: 'geo-9-1', title: 'Векторы' },
            { id: 'geo-9-2', title: 'Метод координат' },
            { id: 'geo-9-3', title: 'Теорема синусов' },
            { id: 'geo-9-4', title: 'Теорема косинусов' },
            { id: 'geo-9-5', title: 'Соотношения в прямоугольном треугольнике' }
          ]
        },
        {
          id: 'geo-10',
          title: '10 класс',
          children: [
            { id: 'geo-10-1', title: 'Стереометрия (введение)' },
            { id: 'geo-10-2', title: 'Параллельность в пространстве' },
            { id: 'geo-10-3', title: 'Перпендикулярность в пространстве' },
            { id: 'geo-10-4', title: 'Многогранники' }
          ]
        },
        {
          id: 'geo-11',
          title: '11 класс',
          children: [
            { id: 'geo-11-1', title: 'Тела вращения' },
            { id: 'geo-11-2', title: 'Объёмы и площади поверхностей' }
          ]
        }
      ]
    },
    {
      id: 'probability',
      title: 'Вероятность и статистика',
      children: [
        {
          id: 'prob-7',
          title: '7 класс',
          children: [
            { id: 'prob-7-1', title: 'Случайные события' },
            { id: 'prob-7-2', title: 'Вероятность' },
            { id: 'prob-7-3', title: 'Частота' }
          ]
        },
        {
          id: 'prob-8',
          title: '8 класс',
          children: [
            { id: 'prob-8-1', title: 'Среднее арифметическое' },
            { id: 'prob-8-2', title: 'Медиана и мода' },
            { id: 'prob-8-3', title: 'Размах' },
            { id: 'prob-8-4', title: 'Комбинаторика' }
          ]
        },
        {
          id: 'prob-9',
          title: '9 класс',
          children: [
            { id: 'prob-9-1', title: 'Сложение вероятностей' },
            { id: 'prob-9-2', title: 'Умножение вероятностей' },
            { id: 'prob-9-3', title: 'Противоположные события' },
            { id: 'prob-9-4', title: 'Геометрическая вероятность' }
          ]
        },
        {
          id: 'prob-10',
          title: '10 класс',
          children: [
            { id: 'prob-10-1', title: 'Статистические данные' },
            { id: 'prob-10-2', title: 'Условная вероятность' },
            { id: 'prob-10-3', title: 'Независимость событий' }
          ]
        },
        {
          id: 'prob-11',
          title: '11 класс',
          children: [
            { id: 'prob-11-1', title: 'Формула полной вероятности' },
            { id: 'prob-11-2', title: 'Формула Байеса' },
            { id: 'prob-11-3', title: 'Биномиальное распределение' }
          ]
        }
      ]
    }
  ];

  const treeContainer = document.getElementById('treeContainer');
  const contentWrapper = document.getElementById('contentWrapper');
  const mainContent = document.getElementById('mainContent');
  const searchInput = document.getElementById('searchInput');

  function buildTree(nodes, level = 1) {
    let html = '';
    nodes.forEach(node => {
      const hasChildren = node.children && node.children.length > 0;
      html += `<div class="tree-node level-${level}" id="node-${node.id}">`;
      html += `<div class="node-content" onclick="handleNodeClick('${node.id}', ${hasChildren})">`;
      if (hasChildren) {
        html += `<span class="arrow-icon">▶</span>`;
      } else {
        html += `<span class="arrow-icon" style="opacity:0;"></span>`;
      }
      html += `<span class="node-title">${node.title}</span>`;
      html += `</div>`;
      if (hasChildren) {
        html += `<div class="tree-children">`;
        html += buildTree(node.children, level + 1);
        html += `</div>`;
      }
      html += `</div>`;
    });
    return html;
  }

  treeContainer.innerHTML = buildTree(mathData);

  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();
    const rootNodes = treeContainer.querySelectorAll('.tree-root > .tree-node');
    
    document.querySelectorAll('.tree-node').forEach(node => {
      node.classList.remove('hidden');
    });

    if (query === '') return;

    function searchInNode(node) {
      const titleEl = node.querySelector(':scope > .node-content > .node-title');
      if (!titleEl) return false;
      
      const titleText = titleEl.textContent.toLowerCase();
      const isMatch = titleText.includes(query);
      
      let childMatch = false;
      const childrenContainer = node.querySelector(':scope > .tree-children');
      
      if (childrenContainer) {
        const childNodes = childrenContainer.querySelectorAll(':scope > .tree-node');
        childNodes.forEach(child => {
          if (searchInNode(child)) childMatch = true;
        });
      }
      
      const hasMatch = isMatch || childMatch;
      
      if (hasMatch) {
        node.classList.remove('hidden');
        if (childMatch && childrenContainer) {
          node.classList.add('expanded');
        }
      } else {
        node.classList.add('hidden');
      }
      
      return hasMatch;
    }

    rootNodes.forEach(rootNode => searchInNode(rootNode));
  });

  function handleNodeClick(nodeId, hasChildren) {
    const nodeElement = document.getElementById(`node-${nodeId}`);
    
    if (hasChildren) {
      nodeElement.classList.toggle('expanded');
      return;
    }

    const nodeData = findNodeById(mathData, nodeId);
    if (nodeData) {
      document.querySelectorAll('.tree-node').forEach(el => el.classList.remove('active'));
      nodeElement.classList.add('active');
      
      document.body.classList.add('content-open');

      const path = getNodePath(mathData, nodeId);
      const breadcrumbHtml = path.map(p => p.title).join(' / ');
      const mobileBack = `<button class="mobile-back" onclick="closeContent()">← Назад</button>`;

      contentWrapper.classList.add('fade-out');

      setTimeout(() => {
        const topicContent = notesData[nodeId] || '<p class="loading-text">Конспект для этой темы еще пишется...</p>';
        
        contentWrapper.innerHTML = `
          ${mobileBack}
          <div class="topic-header">
            <div class="breadcrumbs">${breadcrumbHtml}</div>
            <h1>${nodeData.title}</h1>
          </div>
          <div class="topic-body">${topicContent}</div>
        `;
        contentWrapper.classList.remove('fade-out');
        mainContent.scrollTop = 0;
      }, 200);
    }
  }

  function closeContent() {
    document.body.classList.remove('content-open');
    document.querySelectorAll('.tree-node').forEach(el => el.classList.remove('active'));
  }

  function findNodeById(nodes, id) {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  function getNodePath(nodes, targetId, currentPath = []) {
    for (const node of nodes) {
      const newPath = [...currentPath, { title: node.title }];
      if (node.id === targetId) return newPath;
      if (node.children) {
        const found = getNodePath(node.children, targetId, newPath);
        if (found) return found;
      }
    }
    return null;
  }
</script>
</body>
</html>