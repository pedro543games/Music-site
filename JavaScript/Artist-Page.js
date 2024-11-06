const urlParams = new URLSearchParams(window.location.search);
const Title = document.getElementById('site-Name');
let Artist = urlParams.get('artist');

// Verifica se o parâmetro artist foi passado na URL
if (!Artist) {
    console.warn('Parâmetro "artist" não encontrado na URL.');
    Artist = 'Artista Desconhecido'; // Valor padrão caso não haja parâmetro
}

// Atualiza o título da página com o nome do artista
Title.textContent = Artist;

const ArtistName = document.getElementById('artist-name');
const ArtistImage = document.getElementById('artist-image');

// Dados dos artistas
const ArtistInfo = [
    {
        Name: 'Seu Jorge',
        PerfilImage: '../Assets/Thumbs/seu-jorge/Perfil_Image.png',
    },
    {
        Name: '7 Minutoz',
        PerfilImage: '../Assets/Thumbs/7-minutoz/Perfil_Image.png'
    }
];

// Encontre as informações do artista correspondente
const artistData = ArtistInfo.find(artist => artist.Name.toLowerCase() === Artist.toLowerCase());

if (artistData) {
    ArtistName.textContent = artistData.Name; // Atualiza o nome do artista
    ArtistImage.src = artistData.PerfilImage; // Atualiza a imagem do artista
} else {
    console.warn('Artista não encontrado. Usando imagem padrão.');
    ArtistName.textContent = 'Artista Desconhecido'; // Nome padrão
    ArtistImage.src = '../Assets/Icons/blank-user.png'; // Imagem padrão
}
