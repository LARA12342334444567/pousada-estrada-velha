# Pousada Estrada Velha — versão definitiva editável

Estrutura preparada para publicação com GitHub + Cloudflare Pages + Pages CMS.

## Como funciona

- O site continua sendo uma página estática, rápida e adequada para Google Ads.
- O conteúdo editável fica em `content/site.json`.
- As fotos ficam em `assets/fotos/`.
- O Pages CMS lê `.pages.yml` e permite editar textos e trocar/enviar fotos sem mexer no HTML.
- Os botões de reserva abrem diretamente o WhatsApp da pousada com a mensagem configurada.
- A seção Nossas diárias e a mensagem automática são editáveis no Pages CMS.
- Todos os botões de WhatsApp preservam a conversão Google Ads `AW-18359313925/CTMgCKuIif4cEIXMs7JE`. O evento mede o clique, não a confirmação de uma reserva.
- As imagens novas são WebP em diferentes tamanhos. As fotos e o logotipo anteriores foram mantidos.

## Publicação recomendada

1. Criar um repositório privado no GitHub.
2. Enviar todos os arquivos deste projeto para a raiz do repositório.
3. Conectar o repositório ao Cloudflare Pages por Git.
4. Deixar o comando de build vazio e a pasta de saída como a raiz do projeto.
5. Depois configurar `pousadaestradavelha.com.br` como domínio personalizado.
6. Entrar em https://app.pagescms.org/ com o GitHub para editar textos e fotos.

## Importante

A reserva não é confirmada automaticamente. O visitante apenas envia uma solicitação pelo WhatsApp; a pousada verifica a agenda e responde.
