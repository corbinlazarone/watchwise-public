"use client";

const BuyMeACoffeeButton = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '18px',
        right: '18px',
        zIndex: 999,
      }}
    >
      <a
        href="https://www.buymeacoffee.com/corbinlazarone"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: '#FF813F',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: '14px',
          fontWeight: '600',
          display: 'inline-flex',
          alignItems: 'center',
          boxShadow: '0px 3px 10px rgba(0,0,0,0.2)',
          transition: 'all 0.2s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.backgroundColor = '#ff904f';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#FF813F';
        }}
      >
        <img 
          src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
          alt=""
          style={{
            height: '20px',
            width: '20px',
            marginRight: '8px',
          }}
        />
        Buy me a coffee
      </a>
    </div>
  );
};

export default BuyMeACoffeeButton;
