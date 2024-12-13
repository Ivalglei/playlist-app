import { Component, ViewChild, ElementRef } from '@angular/core';
import { PlaylistService } from './playlist.service'; // Importe o serviço
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent {
  @ViewChild('audioPlayer', { static: false })
  audioPlayer!: ElementRef<HTMLAudioElement>; // Referência ao player de áudio

  musicaNova: string = '';
  musicas: string[] = []; // Lista de músicas
  musicaAtual: string | null = null; // Música que está tocando no momento

  constructor(private playlistService: PlaylistService) { }
  opcoesMusicas: string[] = ['amor_e_fe.mp3', 'calcinhapreta_doisamores.mp3', 'lambertos.mp3', 
    'lambertos-the-final.mp3', 'pregonachinela.mp3'];
  // Adiciona uma música à lista
  adicionarMusica(musica: string) {
    if (musica) {


      this.musicas.push(`assets/${musica}`);
      this.musicaNova = ''; // Limpa o campo de entrada
    }
  }

  // Remove uma música da lista
  removerMusica(index: number) {
    this.musicas.splice(index, 1);
  }

  // Seleciona e toca uma música
  selecionarMusica(musica: string) {
    this.musicaAtual = musica;
    this.tocarMusica();
  }

  // Método para tocar a música atual
  tocarMusica() {
    if (this.audioPlayer?.nativeElement) {
      const player = this.audioPlayer.nativeElement;
      player.pause(); // Para qualquer reprodução atual
      player.load(); // Carrega a nova música
      player
        .play()
        .then(() => {
          console.log('Música tocando:', this.musicaAtual);
        })
        .catch((error) => {
          console.error('Erro ao tentar tocar a música:', error);
        });
    }
  }

  // Toca a próxima música automaticamente
  tocarProximaMusica() {
    if (this.musicaAtual) {
      const indiceAtual = this.musicas.indexOf(this.musicaAtual);
      const proximaMusica = this.musicas[indiceAtual + 1];
      if (proximaMusica) {
        this.musicaAtual = proximaMusica;
        setTimeout(() => this.tocarMusica(), 100); // Pequeno atraso para garantir a transição
      } else {
        console.log('Fim da playlist');
        this.musicaAtual = null; // Fim da playlist
      }
    }
  }
}
