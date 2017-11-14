	angular.module("eXpotifai").controller("eXpotifaiCtrl",function($scope) {

			$scope.artistas= [

			];
			$scope.notas = [
							{valor:1},
							{valor:2},
							{valor:3},
							{valor:4},
							{valor:5},
							{valor:6},
							{valor:7},
							{valor:8},
							{valor:9},
							{valor:10},
						];

			$scope.playlists = [];



			$scope.existeArtista = function(artistaNome) {
				for (var i = 0; i < $scope.artistas.length; i++) {
					if ($scope.artistas[i].nome == artistaNome) {
						return $scope.artistas[i];
					}
				}
				return false;
			};

			$scope.adicionaArtista = function(artista) {
				if (!$scope.existeArtista(artista.nome)) {
					artista.albuns = [];
					$scope.artistas.push(angular.copy(artista));
					delete $scope.artista;
				} else {
					alert("Artista já cadastradao")
				}
			}

			$scope.existeAlbum = function(nomeDoAlbum,artista) {
				for (var i = 0; i < artista.albuns.length; i++) {
					if (artista.albuns[i].nome == nomeDoAlbum) {
						return artista.albuns[i];
					}
				}
				return false;

			};

			$scope.insereAlbum = function(nomeDoAlbum,artista) {
				artista.albuns.push({nome:nomeDoAlbum,musicas:[]});
			}

			$scope.musicaJaExiste = function(album,nome) {
				for (var i = 0; i < album.musicas.length; i++) {
					if (album.musicas[i].nome == nome) {
						return album.musicas[i];
					}
				}

				return false;
			}


			$scope.adicionaMusica= function(musica) {
				if (!$scope.existeArtista(musica.artista)) {
					$scope.adicionaArtista({nome:musica.artista});
				}
				var artista = $scope.existeArtista(musica.artista);
				if (!$scope.existeAlbum(musica.album,artista)) {
					$scope.insereAlbum(musica.album,artista);
				}
				var album = $scope.existeAlbum(musica.album,artista);
				if (!$scope.musicaJaExiste(album,musica.nome)) {
					album.musicas.push(angular.copy(musica));
					delete $scope.musica;
					alert("Musica adicionada!");	
				} else {
					alert("Musica ja existente no album");
					delete $scope.musica;
				}
			};

			$scope.getMusicasEscolhidas = function() {
				var musicasEscolhidas = [];
				for (var i = 0; i < $scope.artistas.length; i++) {
					if ($scope.artistas[i].escolhido) {
						var artista = $scope.artistas[i];
						for (var j = 0; j < artista.albuns.length; j++) {
							var album = artista.albuns[j];
							for (var k = 0; k < album.musicas.length; k++) {
								musicasEscolhidas.push(album.musicas[k]);
							}
						}
					}
				}

				return musicasEscolhidas;
			
				
			};

			$scope.setArtistaParametro = function(artista) {
				$scope.artistaParametro = angular.copy(artista);
				delete $scope.artistaPesquisa;
			}

			$scope.setUltimaMusica = function(musica)  {
				var artistaAtual = $scope.existeArtista(musica.artista);
				artistaAtual.ultimaMusica =  musica.nome + "("+ musica.album + ")";

			}

			$scope.adicionaFavoritos = function() {
				var favorito = $scope.artistas[0];
				for (var i = 0; i < $scope.artistas.length; i++) {
					if ($scope.artistas[i].escolhido) {
						var artista = $scope.artistas[i];
						artista.favorito = true;
					}
				}
			}; 


			$scope.removeFavoritos = function() {
				var  resposta =	prompt("Você tem certeza disso? Digite SIM para confirmar");
				if (resposta != "SIM") {
					alert("Remoção cancelada");
					return;
				}
				for (var i = 0; i < $scope.artistas.length; i++) {
						if ($scope.artistas[i].escolhido) {
							var artista = $scope.artistas[i];
							if (artista.favorito) {
								artista.favorito = false;
							}
						}
					}

			};

			$scope.getMusicasSelecionadas = function() {
				var musicasSelecionadas = [];
				for (var i = 0; i < $scope.artistas.length; i++) {
						var artista = $scope.artistas[i];
						for (var j = 0; j < artista.albuns.length; j++) {
							var album = artista.albuns[j];
							for (var k = 0; k < album.musicas.length; k++) {
								var musica = album.musicas[k];
								if (musica.escolhido) {
									musicasSelecionadas.push(album.musicas[k]);
								}
							
							}
						}
				}
				return musicasSelecionadas;

			};

			$scope.eFavorito = function(artista) {
				if (artista.favorito) {
					return "SIM"
				}
				return "NAO"
			}

			$scope.removePlaylist = function() {
				var  resposta =	prompt("Você tem certeza disso? Digite SIM para confirmar");
				if (resposta != "SIM") {
					alert("Remoção cancelada");
					return;
				}
				var playlist = $scope.getPlaylist();
				var musicasSelecionadas = $scope.getMusicasSelecionadas();
				for (var i = 0; i < musicasSelecionadas.length; i++) {
					var index = playlist.musicas.indexOf(musicasSelecionadas[i]);
					while(index > -1 ) {
		   				 playlist.musicas.splice(index, 1);
		   				 index = playlist.musicas.indexOf(musicasSelecionadas[i]);
					}
				}



			};

			$scope.getPlaylist = function() {
				var nomePlaylist = prompt("Digite o nome da playlist:");
				for ( i in $scope.playlists) {
					if ($scope.playlists[i].nome == nomePlaylist) {
						return $scope.playlists[i];
					}
				}
				var nova = {musicas:[], nome : nomePlaylist};
				$scope.playlists.push(nova);
				return nova;



			};


			$scope.adicionaPlaylist = function() {
				var playlist = $scope.getPlaylist();
				var musicasSelecionadas = $scope.getMusicasSelecionadas();
				for ( var i = 0;i < musicasSelecionadas.length ; i++) {
					playlist.musicas.push(musicasSelecionadas[i]);
				};

			};





			
		});