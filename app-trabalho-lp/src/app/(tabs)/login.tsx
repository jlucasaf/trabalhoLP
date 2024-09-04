import React from 'react';

const BemVindo: React.FC = () => {
  return (
    <div style={{ width: 390, height: 844, background: 'white', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: 41, display: 'inline-flex' }}>
      <div style={{ width: 637, height: 369, position: 'relative' }}>
        <div style={{ width: 390, height: 369, left: 124, top: 0, position: 'absolute', background: 'white' }} />
        <div style={{ width: 232, height: 42, left: 203, top: 317, position: 'absolute', color: '#DC7373', fontSize: 36, fontFamily: 'Roboto', fontWeight: '700', wordWrap: 'break-word' }}>
          Bem vindo(a)!
        </div>
        <img
          style={{ width: 637, height: 272, left: 0, top: 45, position: 'absolute' }}
          src="https://via.placeholder.com/637x272"
          alt="Placeholder"
        />
      </div>
      <div style={{ width: 390, height: 538, position: 'relative' }}>
        <div style={{ width: 390, height: 538, left: 0, top: 0, position: 'absolute', background: '#DC7373', borderRadius: 30 }} />
        <div style={{ width: 137, height: 19, left: 122, top: 233, position: 'absolute', color: '#CFCDCD', fontSize: 14, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
          Esqueceu sua senha?
        </div>
        <div style={{ width: 300, height: 52, paddingLeft: 20, paddingRight: 20, paddingTop: 6, paddingBottom: 6, left: 51, top: 85, position: 'absolute', borderRadius: 4, border: '1px white solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
          <div style={{ width: 130, height: 35, padding: 10, background: '#DC7373', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
            <div style={{ width: 126, height: 23, color: 'white', fontSize: 15, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
              E-mail ou usuário
            </div>
          </div>
        </div>
        <div style={{ width: 300, height: 52, paddingLeft: 20, paddingRight: 20, paddingTop: 6, paddingBottom: 6, left: 51, top: 170, position: 'absolute', borderRadius: 4, border: '1px white solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
          <div style={{ width: 130, height: 35, padding: 10, background: '#DC7373', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
            <div style={{ width: 126, height: 23, color: 'white', fontSize: 15, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
              Senha
            </div>
          </div>
          <div style={{ width: 24, height: 24, padding: 3, justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
            <div style={{ width: 18, height: 18, position: 'relative' }}>
              <div style={{ width: 3.41, height: 3.41, left: 7, top: 7.59, position: 'absolute', border: '2px #DDDDDD solid' }}></div>
              <div style={{ width: 18, height: 18, left: 0, top: 0, position: 'absolute', border: '2px #DDDDDD solid' }}></div>
            </div>
          </div>
        </div>
        <div style={{ width: 300, height: 40, paddingLeft: 111, paddingRight: 111, paddingTop: 8, paddingBottom: 8, left: 45, top: 282, position: 'absolute', background: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
          <div style={{ color: '#DC7373', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
            Acessar
          </div>
        </div>
        <div style={{ width: 237, height: 19, left: 64, top: 348, position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
          <div style={{ width: 161, height: 17, color: 'white', fontSize: 14, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
            Não possui uma conta?
          </div>
          <div style={{ width: 76, height: 19, color: '#CFCDCD', fontSize: 14, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
            Inscreva-se
          </div>
        </div>
      </div>
    </div>
  );
}

export default BemVindo;
