import React from 'react';

const BemVindo: React.FC = () => {
  return (
    <div style={{ width: 390, height: 844, position: 'relative', background: '#DC7373' }}>
      <img
        style={{ width: 718, height: 424, left: -164, top: 19, position: 'absolute' }}
        src="https://via.placeholder.com/718x424"
        alt="Placeholder"
      />
      <div style={{ width: 348, height: 67, left: 30, top: 409, position: 'absolute' }}>
        <div style={{ width: 238.96, height: 43.30, left: 45, top: 0, position: 'absolute', background: '#DC7373' }} />
        <div
          style={{
            width: 348,
            height: 61,
            left: 0,
            top: 6,
            position: 'absolute',
            color: 'white',
            fontSize: 25,
            fontFamily: 'Roboto',
            fontWeight: '700',
            wordWrap: 'break-word',
          }}
        >
          Acompanhe o impacto da sua doação em tempo real!
        </div>
      </div>
      <div
        style={{
          width: 300,
          height: 40,
          paddingLeft: 111,
          paddingRight: 111,
          paddingTop: 8,
          paddingBottom: 8,
          left: 45,
          top: 668,
          position: 'absolute',
          background: 'white',
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          display: 'inline-flex',
        }}
      >
        <div style={{ color: '#DC7373', fontSize: 20, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
          Acessar
        </div>
      </div>
      <div
        style={{
          left: 61,
          top: 616,
          position: 'absolute',
          color: '#FFCACA',
          fontSize: 15,
          fontFamily: 'Roboto',
          fontWeight: '400',
          wordWrap: 'break-word',
        }}
      >
        Faça o login para continuar
      </div>
    </div>
  );
}

export default BemVindo;
