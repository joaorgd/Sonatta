import React, { useState } from 'react';
import Button from './Button';
import TagButton from './TagButton';

// Dados de exemplo para as tags
const niveis = ['Iniciante', 'Intermediário', 'Avançado'];
const instrumentos = ['Violão', 'Guitarra', 'Piano', 'Bateria', 'Baixo', 'Voz', 'Ukulele', 'Sopro'];
const generos = ['Rock', 'Pop', 'MPB', 'Sertanejo', 'Clássico', 'Jazz', 'Blues', 'Gospel'];

function MusicalProfileModal({ onClose, onSubmit }) {
  const [selectedNivel, setSelectedNivel] = useState(null);
  const [selectedInstrumentos, setSelectedInstrumentos] = useState([]);
  const [selectedGeneros, setSelectedGeneros] = useState([]);

  // Função para lidar com a seleção de nível (só pode um)
  const handleNivelClick = (nivel) => {
    setSelectedNivel(nivel);
  };

  // Função para lidar com seleção de múltiplos instrumentos
  const handleInstrumentoClick = (instrumento) => {
    setSelectedInstrumentos((prev) =>
      prev.includes(instrumento)
        ? prev.filter((i) => i !== instrumento) // Remove se já estiver selecionado
        : [...prev, instrumento] // Adiciona se não estiver
    );
  };

  // Função para lidar com seleção de múltiplos gêneros
  const handleGeneroClick = (genero) => {
    setSelectedGeneros((prev) =>
      prev.includes(genero)
        ? prev.filter((g) => g !== genero)
        : [...prev, genero]
    );
  };

  const handleSubmit = () => {
    // Envia os dados para o componente pai (StudentDashboard)
    onSubmit({
      nivel: selectedNivel,
      instrumentos: selectedInstrumentos,
      generos: selectedGeneros,
    });
  };

  return (
    // Overlay (fundo escuro)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      
      {/* Conteúdo do Modal */}
      <div className="bg-dark-gray p-8 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        
        {/* Botão de Fechar (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">Seu Perfil Musical</h2>
        <p className="text-center text-gray-300 mb-8">Selecione seus interesses para personalizarmos sua jornada.</p>

        {/* Container rolável para as tags */}
        <div className="overflow-y-auto pr-2">
          
          {/* Nível Musical */}
          <div className="mb-6">
            <label className="block text-white-text text-lg font-bold mb-3">Qual seu nível?</label>
            <div className="flex flex-wrap gap-3">
              {niveis.map((nivel) => (
                <TagButton
                  key={nivel}
                  onClick={() => handleNivelClick(nivel)}
                  isSelected={selectedNivel === nivel}
                >
                  {nivel}
                </TagButton>
              ))}
            </div>
          </div>

          {/* Instrumentos de Interesse */}
          <div className="mb-6">
            <label className="block text-white-text text-lg font-bold mb-3">Quais instrumentos você tem interesse?</label>
            <div className="flex flex-wrap gap-3">
              {instrumentos.map((instrumento) => (
                <TagButton
                  key={instrumento}
                  onClick={() => handleInstrumentoClick(instrumento)}
                  isSelected={selectedInstrumentos.includes(instrumento)}
                >
                  {instrumento}
                </TagButton>
              ))}
            </div>
          </div>

          {/* Gêneros Musicais */}
          <div className="mb-6">
            <label className="block text-white-text text-lg font-bold mb-3">Quais gêneros você mais curte?</label>
            <div className="flex flex-wrap gap-3">
              {generos.map((genero) => (
                <TagButton
                  key={genero}
                  onClick={() => handleGeneroClick(genero)}
                  isSelected={selectedGeneros.includes(genero)}
                >
                  {genero}
                </TagButton>
              ))}
            </div>
          </div>

        </div>

        {/* Botão de Avançar */}
        <Button onClick={handleSubmit} variant="primary" className="w-full mt-6">
          Concluir
        </Button>
      </div>
    </div>
  );
}

export default MusicalProfileModal;