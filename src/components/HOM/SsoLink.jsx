const SsoLink = () => {
  return (
    <>
      <div
        onClick={() => {
          window.open("https://www.inha.ac.kr/");
        }}
      >
        인하대 홈페이지
      </div>
    </>
  );
};

export default SsoLink;
