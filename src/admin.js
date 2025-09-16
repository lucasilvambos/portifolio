// Senha para acesso admin (em produção, isso deveria ser mais seguro)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '123456';

// Dados do portfólio
let portfolioData = {
    bio: {
        name: "Lucas Ambos",
        title: "Desenvolvedor Frontend",
        description: "Desenvolvedor apaixonado por criar experiências web incríveis. Especializado em React, JavaScript e design responsivo."
    },
    contact: {
        email: "lucas@example.com",
        whatsapp: "+55 11 99999-9999",
        github: "https://github.com/lucasambos",
        linkedin: "https://linkedin.com/in/lucasambos"
    },
    projects: [
        {
            id: 1,
            title: "Link Tree",
            description: "Uma página simples e elegante para centralizar todos os seus links importantes em um só lugar.",
            url: "https://link-tree-brown.vercel.app/",
            technologies: ["HTML", "CSS", "JavaScript"]
        },
        {
            id: 2,
            title: "Local Storage App",
            description: "Aplicação que demonstra o uso do Local Storage para persistência de dados no navegador.",
            url: "https://local-storage-eosin.vercel.app/",
            technologies: ["React", "Local Storage", "CSS"]
        },
        {
            id: 3,
            title: "Cafeteria",
            description: "Site completo para uma cafeteria com navegação, catálogo de produtos e design moderno.",
            url: "https://cafeteria-sooty.vercel.app/",
            technologies: ["React", "CSS", "Responsive Design"]
        }
    ]
};

// Carregar dados salvos
function loadData() {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        portfolioData = JSON.parse(savedData);
    }
}

// Salvar dados
function saveData() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
}

// Login
function setupLogin() {
    const loginForm = document.getElementById('admin-login');
    const loginError = document.getElementById('login-error');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('admin-panel').style.display = 'block';
            loadAdminData();
        } else {
            loginError.style.display = 'block';
            setTimeout(() => {
                loginError.style.display = 'none';
            }, 3000);
        }
    });
}

// Logout
function setupLogout() {
    document.getElementById('logout').addEventListener('click', function() {
        document.getElementById('admin-panel').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('password').value = '';
    });
}

// Carregar dados no painel admin
function loadAdminData() {
    // Carregar bio
    document.getElementById('edit-name').value = portfolioData.bio.name;
    document.getElementById('edit-title').value = portfolioData.bio.title;
    document.getElementById('edit-description').value = portfolioData.bio.description;
    
    // Carregar contato
    document.getElementById('edit-email').value = portfolioData.contact.email;
    document.getElementById('edit-whatsapp').value = portfolioData.contact.whatsapp;
    document.getElementById('edit-github').value = portfolioData.contact.github;
    document.getElementById('edit-linkedin').value = portfolioData.contact.linkedin;
    
    // Carregar projetos
    loadProjectsEditor();
}

// Carregar editor de projetos
function loadProjectsEditor() {
    const projectsEditor = document.getElementById('projects-editor');
    projectsEditor.innerHTML = '';
    
    portfolioData.projects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-editor';
        
        projectDiv.innerHTML = `
            <h4>
                Projeto ${index + 1}
                <button type="button" class="delete-project" onclick="deleteProject(${index})">
                    Excluir
                </button>
            </h4>
            <div class="form-group">
                <label>Título:</label>
                <input type="text" class="form-control" value="${project.title}" 
                       onchange="updateProject(${index}, 'title', this.value)">
            </div>
            <div class="form-group">
                <label>Descrição:</label>
                <textarea class="form-control" rows="3" 
                          onchange="updateProject(${index}, 'description', this.value)">${project.description}</textarea>
            </div>
            <div class="form-group">
                <label>URL:</label>
                <input type="url" class="form-control" value="${project.url}" 
                       onchange="updateProject(${index}, 'url', this.value)">
            </div>
            <div class="form-group">
                <label>Tecnologias (separadas por vírgula):</label>
                <input type="text" class="form-control" value="${project.technologies.join(', ')}" 
                       onchange="updateProject(${index}, 'technologies', this.value.split(',').map(t => t.trim()))">
            </div>
        `;
        
        projectsEditor.appendChild(projectDiv);
    });
    
    // Botão para adicionar novo projeto
    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.className = 'add-project';
    addButton.textContent = 'Adicionar Novo Projeto';
    addButton.onclick = addProject;
    
    projectsEditor.appendChild(addButton);
}

// Atualizar projeto
function updateProject(index, field, value) {
    portfolioData.projects[index][field] = value;
}

// Excluir projeto
function deleteProject(index) {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
        portfolioData.projects.splice(index, 1);
        loadProjectsEditor();
    }
}

// Adicionar novo projeto
function addProject() {
    const newProject = {
        id: Date.now(),
        title: "Novo Projeto",
        description: "Descrição do novo projeto",
        url: "https://exemplo.com",
        technologies: ["HTML", "CSS", "JavaScript"]
    };
    
    portfolioData.projects.push(newProject);
    loadProjectsEditor();
}

// Salvar alterações
function setupSave() {
    document.getElementById('save-changes').addEventListener('click', function() {
        // Atualizar bio
        portfolioData.bio.name = document.getElementById('edit-name').value;
        portfolioData.bio.title = document.getElementById('edit-title').value;
        portfolioData.bio.description = document.getElementById('edit-description').value;
        
        // Atualizar contato
        portfolioData.contact.email = document.getElementById('edit-email').value;
        portfolioData.contact.whatsapp = document.getElementById('edit-whatsapp').value;
        portfolioData.contact.github = document.getElementById('edit-github').value;
        portfolioData.contact.linkedin = document.getElementById('edit-linkedin').value;
        
        // Salvar dados
        saveData();
        
        // Mostrar mensagem de sucesso
        const successMessage = document.getElementById('save-success');
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    });
}

// Verificar se está na URL /admin
function checkAdminURL() {
    const currentPath = window.location.pathname;
    if (!currentPath.includes('admin')) {
        // Redirecionar para admin.html se acessado via /admin
        if (window.location.hash === '#admin' || window.location.search.includes('admin')) {
            window.location.href = 'admin.html';
        }
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    checkAdminURL();
    loadData();
    setupLogin();
    setupLogout();
    setupSave();
});

// Adicionar suporte para acessar via /admin na URL principal
if (window.location.pathname === '/' && window.location.hash === '#admin') {
    window.location.href = 'admin.html';
}

