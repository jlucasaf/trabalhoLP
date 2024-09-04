import React from 'react';

const DonationForm: React.FC = () => {
  return (
    <div style={{ width: 390, height: 844, position: 'relative', background: 'white' }}>
      <div style={{ width: 14.44, height: 21, left: 20, top: 53, position: 'absolute', background: '#DC7373' }}></div>
      <div style={{ width: 273, height: 35, left: 56, top: 61, position: 'absolute', textAlign: 'center', color: '#DC7373', fontSize: 36, fontFamily: 'Roboto', fontWeight: '700', wordWrap: 'break-word' }}>
        Nova doação
      </div>
      <div style={{ width: 326, height: 52, paddingLeft: 20, paddingRight: 20, paddingTop: 6, paddingBottom: 6, left: 27, top: 162, position: 'absolute', background: 'rgba(255, 255, 255, 0.50)', borderRadius: 10, border: '1px #F2C5C4 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
        <div style={{ width: 130, height: 35, padding: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
          <div style={{ width: 299, height: 23, color: '#B2B0B0', fontSize: 15, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
            NOME DO PRODUTO<br />
          </div>
        </div>
      </div>
      <div style={{ width: 326, height: 52, paddingLeft: 20, paddingRight: 20, paddingTop: 6, paddingBottom: 6, left: 27, top: 238, position: 'absolute', background: 'rgba(255, 255, 255, 0.50)', borderRadius: 10, border: '1px #F2C5C4 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
        <div style={{ width: 130, height: 35, padding: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
          <div style={{ width: 126, height: 23, color: '#B2B0B0', fontSize: 15, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
            CIDADE<br />
          </div>
        </div>
      </div>
      <div style={{ width: 326, height: 52, paddingLeft: 20, paddingRight: 20, paddingTop: 6, paddingBottom: 6, left: 27, top: 390, position: 'absolute', background: 'rgba(255, 255, 255, 0.50)', borderRadius: 10, border: '1px #F2C5C4 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
        <div style={{ width: 130, height: 35, padding: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
          <div style={{ width: 126, height: 23, color: '#B2B0B0', fontSize: 15, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
            CEP<br />
          </div>
        </div>
      </div>
      <div style={{ width: 326, height: 52, paddingLeft: 20, paddingRight: 20, paddingTop: 6, paddingBottom: 6, left: 27, top: 466, position: 'absolute', background: 'rgba(255, 255, 255, 0.50)', borderRadius: 10, border: '1px #F2C5C4 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
        <div style={{ width: 130, height: 35, padding: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
          <div style={{ width: 126, height: 23, color: '#B2B0B0', fontSize: 15, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
            DESTINATÁRIO
          </div>
        </div>
      </div>
      <div style={{ width: 326, height: 52, paddingLeft: 20, paddingRight: 20, paddingTop: 6, paddingBottom: 6, left: 27, top: 314, position: 'absolute', background: 'rgba(255, 255, 255, 0.50)', borderRadius: 10, border: '1px #F2C5C4 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
        <div style={{ width: 130, height: 35, padding: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
          <div style={{ width: 126, height: 23, color: '#B2B0B0', fontSize: 15, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
            ENDEREÇO<br />
          </div>
        </div>
      </div>
      <div style={{ width: 87.86, height: 41, paddingLeft: 72.24, paddingRight: 72.24, paddingTop: 5.21, paddingBottom: 5.21, left: 265, top: 552, position: 'absolute', background: '#DC7373', borderRadius: 65.08, justifyContent: 'center', alignItems: 'center', gap: 6.51, display: 'inline-flex' }}>
        <div style={{ color: 'white', fontSize: 13.02, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>
          Concluir
        </div>
      </div>
    </div>
  );
}

export default DonationForm;
