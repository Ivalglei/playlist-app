import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private musicas: string[] = [];

  // Retorna a lista de músicas
  getMusicas(): string[] {
    return this.musicas;
  }

  // Adiciona uma nova música
  adicionarMusica(musica: string) {
    this.musicas.push(`assets/${musica}`);
  }

  // Remove uma música pelo índice
  removerMusica(index: number) {
    this.musicas.splice(index, 1);
  }
}
