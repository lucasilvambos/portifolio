# Portfólio Lucas Ambos

Um site portfólio simples e elegante desenvolvido com HTML, CSS e JavaScript puros.

## Características

- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Navegação Suave**: Scroll suave entre seções
- **Página Administrativa**: Sistema de edição completo em `/admin`
- **Persistência de Dados**: Utiliza localStorage para salvar alterações
- **Interface Moderna**: Design limpo e profissional

## Estrutura do Projeto

```
portfolio-simples/
├── index.html          # Página principal
├── admin.html          # Página administrativa
├── css/
│   ├── style.css       # Estilos principais
│   └── admin.css       # Estilos da página admin
├── js/
│   ├── script.js       # JavaScript principal
│   └── admin.js        # JavaScript da página admin
├── images/             # Pasta para imagens
└── .htaccess          # Configuração de redirecionamento
```

## Funcionalidades

### Página Principal
- Seção Hero com informações pessoais
- Seção de Projetos com cards interativos
- Seção de Contato com links para redes sociais
- Navegação responsiva com menu hamburger

### Página Administrativa (/admin)
- Login com senha (padrão: `admin123`)
- Edição de informações pessoais (nome, título, descrição)
- Edição de informações de contato (email, WhatsApp, GitHub, LinkedIn)
- Gerenciamento completo de projetos:
  - Adicionar novos projetos
  - Editar projetos existentes
  - Excluir projetos
  - Editar tecnologias utilizadas

## Como Usar

### Acesso Normal
1. Abra `index.html` no navegador
2. Navegue pelas seções usando o menu

### Acesso Administrativo
1. Acesse `/admin` ou abra `admin.html`
2. Digite a senha: `admin123`
3. Edite o conteúdo conforme necessário
4. Clique em "Salvar Alterações"

## Personalização

### Alterando a Senha Admin
Edite a variável `ADMIN_PASSWORD` no arquivo `js/admin.js`:

```javascript
const ADMIN_PASSWORD = 'sua_nova_senha';
```

### Alterando Cores
Modifique as variáveis CSS no arquivo `css/style.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #667eea;
    /* ... outras cores */
}
```

### Adicionando Novas Seções
1. Adicione o HTML na `index.html`
2. Adicione os estilos em `css/style.css`
3. Adicione a funcionalidade em `js/script.js`

## Tecnologias Utilizadas

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript ES6+
- LocalStorage para persistência

## Compatibilidade

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Deploy

O projeto pode ser hospedado em qualquer servidor web estático:

- GitHub Pages
- Netlify
- Vercel
- Apache/Nginx

Certifique-se de que o arquivo `.htaccess` seja suportado para o redirecionamento `/admin`.

## Licença

Este projeto é de uso livre para fins pessoais e comerciais.

