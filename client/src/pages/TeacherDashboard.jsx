import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importe useLocation
import StudentSidebar from '../components/StudentSidebar';
import MusicalProfileModal from '../components/MusicalProfileModal'; // Importe o novo modal

function StudentDashboard() {
  const [userName, setUserName] = useState('');
  
  // *** ALTERAÇÕES AQUI ***
  const location = useLocation();
  // Mostra o modal se o estado 'showProfileModal' for verdadeiro (vindo do AboutYou)
  // Ou, no futuro, se a API disser que o perfil está incompleto
  const [showModal, setShowModal] = useState(location.state?.showProfileModal || false);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Função para receber os dados do modal e fechar
  const handleProfileSubmit = (profileData) => {
    console.log('Dados do Perfil Musical:', profileData);
    // Aqui você fará a chamada de API para salvar esses dados
    // ...
    setShowModal(false);
  };
  
  // Adiciona 'relative' ao container principal para o modal se posicionar corretamente
  return (
    <div className="relative min-h-screen bg-new-bg text-white-text font-poppins flex flex-col md:flex-row">
      
      {/* *** RENDERIZAÇÃO CONDICIONAL DO MODAL *** */}
      {showModal && (
        <MusicalProfileModal 
          onClose={() => setShowModal(false)}
          onSubmit={handleProfileSubmit}
        />
      )}

      <StudentSidebar />

      {/* Conteúdo Principal */}
      <div className="flex-grow flex flex-col">
        <main className="flex-grow flex flex-col items-center justify-center p-8">
          <div className="text-center w-full mb-12">
            <h1 className="text-4xl font-bold mb-2">Bem-Vindo(a), {userName}!</h1>
            <h2 className="text-2xl mb-4">Seu Caminho Musical no Sonatta</h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto">
              Continue sua jornada de aprendizado personalizada. Aqui você encontra suas aulas, suas atividades e seu progresso.
            </p>
          </div>
          <section className="flex flex-col md:flex-row gap-8 md:gap-12 w-full px-4 md:px-0">
            
             <Link to="/lessons" className="group flex flex-col items-center text-center w-full md:w-auto">
              {/* Card Branco do Botão */}
              <div className="w-full md:w-[260px] h-[300px] md:h-[390px] rounded-[15px] bg-white flex flex-col items-center justify-center transition-transform group-hover:scale-105">
                <img 
                  src="/assets/Minhas Aulas.png"
                  alt="Minhas Aulas" 
                  className="w-55 h-55"
                />
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-lg mt-4 text-white-text">Minhas Aulas</span>
            </Link>
            
            <Link to="/practice" className="group flex flex-col items-center text-center w-full md:w-auto">
              {/* Card Branco do Botão */}
              <div className="w-full md:w-[260px] h-[300px] md:h-[390px] rounded-[15px] bg-white flex flex-col items-center justify-center transition-transform group-hover:scale-105">
                <img 
                  src="/assets/Praticar.png"
                  alt="Praticar" 
                  className="w-55 h-55"
                />
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-lg mt-4 text-white-text">Praticar</span>
            </Link>

          </section>
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;