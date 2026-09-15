# Pousada Estrada Velha — versão definitiva editável

Estrutura preparada para publicação com GitHub + Cloudflare Pages + Pages CMS.

## Como funciona

- O site continua sendo uma página estática, rápida e adequada para Google Ads.
- O conteúdo editável fica em `content/site.json`.
- As fotos ficam em `assets/fotos/`.
- O Pages CMS lê `.pages.yml` e permite editar textos e trocar/enviar fotos sem mexer no HTML.
- O formulário de reserva abre o WhatsApp da pousada com a solicitação preenchida.

## Publicação recomendada

1. Criar um repositório privado no GitHub.
2. Enviar todos os arquivos deste projeto para a raiz do repositório.
3. Conectar o repositório ao Cloudflare Pages por Git.
4. Deixar o comando de build vazio e a pasta de saída como a raiz do projeto.
5. Depois configurar `pousadaestradavelha.com.br` como domínio personalizado.
6. Entrar em https://app.pagescms.org/ com o GitHub para editar textos e fotos.

## Importante

A reserva não é confirmada automaticamente. O visitante apenas envia uma solicitação pelo WhatsApp; a pousada verifica a agenda e responde.
