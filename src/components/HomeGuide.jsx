const COPY = {
  ko: {
    howTitle: 'Suno 플레이리스트 다운로드 방법',
    howIntro: '네 단계면 충분합니다. 본인이 만들었거나 적법한 다운로드 권한을 가진 곡에 한해 사용해 주세요.',
    steps: [
      {
        h: '플레이리스트 URL 복사',
        body: 'Suno 웹사이트에서 다운로드할 플레이리스트를 열고 주소창의 URL을 복사합니다. (예: suno.com/playlist/fe85c062-…)',
      },
      {
        h: 'URL 붙여넣기',
        body: 'SunoDown 입력란에 복사한 URL을 붙여넣고 "불러오기" 버튼을 클릭합니다. 플레이리스트 ID만 입력해도 됩니다.',
      },
      {
        h: '형식 선택',
        body: 'MP3(무료) 또는 WAV(본인의 Suno Pro·Premier 계정 연동 필요) 중 원하는 형식을 선택합니다.',
      },
      {
        h: '다운로드',
        body: '개별 곡을 하나씩 다운로드하거나 "전체 ZIP 다운로드"로 여러 곡을 ZIP 파일 하나에 묶어 받습니다.',
      },
    ],
    guideLink: '단계별 상세 가이드 보기 →',
    guideUrl: '/ko/guide/how-to-download-suno-playlist',

    featuresTitle: '주요 기능',
    features: [
      {
        h: 'MP3 무료 다운로드',
        body: '직접 만든 Suno AI 곡을 계정 없이 MP3 형식으로 무료 다운로드할 수 있습니다.',
      },
      {
        h: 'WAV 고음질 다운로드',
        body: '본인의 Suno Pro 또는 Premier 계정을 연동하면 무손실 WAV 형식으로 다운로드할 수 있습니다.',
      },
      {
        h: 'ZIP으로 백업',
        body: '본인 라이브러리의 곡을 ZIP 파일 하나로 묶어 편리하게 백업할 수 있습니다.',
      },
      {
        h: '회원가입 불필요',
        body: '회원가입이나 소프트웨어 설치 없이 웹 브라우저에서 바로 사용할 수 있습니다.',
      },
      {
        h: '다국어 지원',
        body: '한국어, English, 日本語 3개 국어를 지원하며, 브라우저 언어에 따라 자동으로 선택됩니다.',
      },
    ],

    faqTitle: '자주 묻는 질문',
    faqs: [
      {
        q: 'SunoDown은 무료인가요?',
        a: <>네, MP3 다운로드는 완전 무료이며 회원가입도 필요 없습니다. WAV 고음질 다운로드는 본인의 Suno Pro 또는 Premier 계정 쿠키를 연동하면 사용할 수 있습니다. SunoDown 서비스 자체에 비용은 없습니다.</>,
      },
      {
        q: '회원가입이 필요한가요?',
        a: <>아닙니다. MP3 다운로드에는 어떠한 계정이나 회원가입도 필요 없습니다. 플레이리스트 URL만 붙여넣으면 바로 다운로드할 수 있습니다.</>,
      },
      {
        q: '어떤 파일 형식을 지원하나요?',
        a: <>MP3와 WAV 두 가지 형식을 지원합니다. MP3는 계정 없이 무료로 다운로드할 수 있고, WAV는 본인의 Suno Pro·Premier 계정 연동 후 사용할 수 있습니다. 여러 곡을 ZIP 파일 하나로 묶어 받는 기능도 제공합니다.</>,
      },
      {
        q: '다른 사람의 곡도 다운로드할 수 있나요?',
        a: (
          <>
            SunoDown은 본인의 Suno 계정으로 생성했거나 적법한 다운로드 권한을 가진 음악을 백업하기 위한
            보조 도구입니다. 타인의 저작물을 무단으로 다운로드·재배포하거나 상업적으로 이용하는 행위는
            금지되며, 그 책임은 사용자 본인에게 있습니다. 권리 침해가 의심되는 콘텐츠는{' '}
            <a href="/ko/contact">문의 페이지</a>로 신고해 주세요.
          </>
        ),
      },
      {
        q: 'WAV 다운로드는 어떻게 하나요?',
        a: (
          <>
            WAV 다운로드에는 본인의 Suno Pro 또는 Premier 계정이 필요합니다. 상단의 "WAV용 Pro 연결"
            버튼을 클릭하고, suno.com에서 <code>__client</code> 쿠키 값을 복사하여 붙여넣으면 됩니다.
            자세한 절차는 <a href="/ko/guide/suno-pro-cookie-setup">Pro 쿠키 설정 가이드</a>를 참고하세요.
          </>
        ),
      },
      {
        q: '안전한가요? 개인정보는 어떻게 처리되나요?',
        a: (
          <>
            SunoDown은 쿠키를 서버 메모리에만 임시 저장하며, 데이터베이스에 기록하지 않습니다.
            서버 세션이 종료되면 모든 데이터가 자동으로 삭제됩니다. SunoDown은 회원 정보를 받지 않으며,
            광고 제공을 위해 Google AdSense가 쿠키를 사용할 수 있습니다. 자세한 내용은{' '}
            <a href="/privacy">개인정보 처리 방침</a>을 참고하세요.
          </>
        ),
      },
    ],
    faqLink: '전체 FAQ 보기 →',
    faqUrl: '/ko/faq',
  },

  en: {
    howTitle: 'How to Download a Suno Playlist',
    howIntro: 'It takes four steps. Please use SunoDown only for tracks you created with your own Suno account or are otherwise permitted to download.',
    steps: [
      {
        h: 'Copy the playlist URL',
        body: "On suno.com, open the playlist you want to download and copy the URL from your browser's address bar (e.g. suno.com/playlist/fe85c062-…).",
      },
      {
        h: 'Paste the URL',
        body: 'Paste the URL into the SunoDown input box and click "Load". Pasting just the playlist ID works too.',
      },
      {
        h: 'Choose a format',
        body: 'Pick MP3 (free) or WAV (requires linking your own Suno Pro or Premier account).',
      },
      {
        h: 'Download',
        body: 'Download tracks one at a time, or click "Download All as ZIP" to save them together in a single ZIP file.',
      },
    ],
    guideLink: 'Read the full step-by-step guide →',
    guideUrl: '/guide/how-to-download-suno-playlist',

    featuresTitle: 'Key Features',
    features: [
      {
        h: 'Free MP3 downloads',
        body: 'Download tracks you made with Suno AI as MP3 for free, with no account needed.',
      },
      {
        h: 'Lossless WAV quality',
        body: 'Link your own Suno Pro or Premier account to download tracks as lossless WAV files.',
      },
      {
        h: 'ZIP backup',
        body: 'Bundle tracks from your own library into a single ZIP file for a convenient backup.',
      },
      {
        h: 'No sign-up required',
        body: 'Start right away in your web browser — no registration and no software to install.',
      },
      {
        h: 'Multi-language',
        body: 'Available in Korean, English, and Japanese, picked automatically from your browser language.',
      },
    ],

    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'Is SunoDown free?',
        a: <>Yes. MP3 downloads are completely free and need no sign-up. WAV downloads work once you connect the cookie from your own Suno Pro or Premier account. SunoDown itself charges nothing.</>,
      },
      {
        q: 'Do I need to create an account?',
        a: <>No. MP3 downloads require no account or registration of any kind. Just paste a playlist URL and start downloading.</>,
      },
      {
        q: 'Which file formats are supported?',
        a: <>Two formats: MP3 and WAV. MP3 is free, with no account needed; WAV is available after linking your own Suno Pro or Premier account. You can also save several tracks together in a single ZIP file.</>,
      },
      {
        q: "Can I download other people's songs?",
        a: (
          <>
            SunoDown is a helper tool for backing up music you generated with your own Suno account or
            otherwise have a lawful right to download. Downloading, redistributing, or commercially
            exploiting other people's work without permission is prohibited, and responsibility rests
            with the user. To report suspected infringement, use the <a href="/contact">contact page</a>.
          </>
        ),
      },
      {
        q: 'How do I download WAV files?',
        a: (
          <>
            WAV downloads require your own Suno Pro or Premier account. Click the "Connect Pro for WAV"
            button at the top of the page, then copy the <code>__client</code> cookie value from suno.com
            and paste it in. The <a href="/guide/suno-pro-cookie-setup">Pro cookie setup guide</a> walks
            through each step.
          </>
        ),
      },
      {
        q: 'Is it safe? How is my data handled?',
        a: (
          <>
            SunoDown keeps your cookie only in server memory and never writes it to a database. All data
            is deleted automatically when the server session ends. SunoDown does not ask for account
            details; Google AdSense may use cookies to serve ads — see the{' '}
            <a href="/privacy">privacy policy</a>.
          </>
        ),
      },
    ],
    faqLink: 'Read the full FAQ →',
    faqUrl: '/faq',
  },

  ja: {
    howTitle: 'Sunoプレイリストをダウンロードする方法',
    howIntro: '使い方は4ステップです。ご自身で作成した曲、または適法にダウンロードする権利を持つ曲に限ってご利用ください。',
    steps: [
      {
        h: 'URLをコピー',
        body: 'suno.comでダウンロードしたいプレイリストを開き、アドレスバーのURLをコピーします。（例: suno.com/playlist/fe85c062-…）',
      },
      {
        h: 'URLを貼り付け',
        body: 'SunoDownの入力欄にURLを貼り付け、「読み込み」をクリックします。プレイリストIDだけでも入力できます。',
      },
      {
        h: '形式を選択',
        body: 'MP3（無料）またはWAV（ご自身のSuno Pro・Premierアカウントの連携が必要）を選択します。',
      },
      {
        h: 'ダウンロード',
        body: '曲を個別にダウンロードするか、「全曲ZIPダウンロード」でひとつのZIPファイルにまとめて保存します。',
      },
    ],
    guideLink: '詳しいステップガイドを読む →',
    guideUrl: '/ja/guide/how-to-download-suno-playlist',

    featuresTitle: '主な機能',
    features: [
      {
        h: 'MP3無料ダウンロード',
        body: 'Suno AIで作った曲を、アカウント不要・無料でMP3ダウンロードできます。',
      },
      {
        h: 'WAV高音質ダウンロード',
        body: 'ご自身のSuno ProまたはPremierアカウントを連携すると、無損失のWAV形式でダウンロードできます。',
      },
      {
        h: 'ZIPでバックアップ',
        body: 'ご自身のライブラリの曲をひとつのZIPファイルにまとめて、手軽にバックアップできます。',
      },
      {
        h: '登録不要',
        body: '会員登録もソフトウェアのインストールも不要で、ブラウザからすぐに使えます。',
      },
      {
        h: '多言語対応',
        body: '日本語・韓国語・英語に対応し、ブラウザの言語設定に合わせて自動で切り替わります。',
      },
    ],

    faqTitle: 'よくある質問',
    faqs: [
      {
        q: 'SunoDownは無料ですか？',
        a: <>はい、MP3ダウンロードは完全無料で、会員登録も不要です。WAV高音質ダウンロードにはご自身のSuno ProまたはPremierアカウントのクッキー連携が必要ですが、SunoDown自体に料金はかかりません。</>,
      },
      {
        q: 'アカウント登録は必要ですか？',
        a: <>いいえ、MP3ダウンロードにはアカウントも登録も不要です。プレイリストURLを貼り付けるだけですぐにダウンロードできます。</>,
      },
      {
        q: 'どのファイル形式に対応していますか？',
        a: <>MP3とWAVの2形式に対応しています。MP3はアカウント不要・無料でダウンロードでき、WAVはご自身のSuno Pro・Premierアカウントを連携すると利用できます。複数の曲をひとつのZIPファイルにまとめて保存する機能もあります。</>,
      },
      {
        q: '他の人の曲もダウンロードできますか？',
        a: (
          <>
            SunoDownは、ご自身のSunoアカウントで生成した、または適法なダウンロード権利を持つ音楽を
            バックアップするための補助ツールです。他者の著作物を無断でダウンロード・再配布・商用利用する行為は
            禁止されており、その責任は利用者本人にあります。権利侵害が疑われるコンテンツは
            <a href="/ja/contact">お問い合わせページ</a>からご報告ください。
          </>
        ),
      },
      {
        q: 'WAVはどうやってダウンロードしますか？',
        a: (
          <>
            WAVダウンロードにはご自身のSuno ProまたはPremierアカウントが必要です。ページ上部の「WAV用 Pro 接続」
            ボタンをクリックし、suno.comでコピーした<code>__client</code>クッキーの値を貼り付けてください。
            詳しい手順は<a href="/ja/guide/suno-pro-cookie-setup">Proクッキー設定ガイド</a>で確認できます。
          </>
        ),
      },
      {
        q: '安全ですか？個人情報はどう扱われますか？',
        a: (
          <>
            SunoDownはクッキーをサーバーメモリにのみ一時保存し、データベースには記録しません。
            サーバーセッションが終了すると、すべてのデータは自動的に削除されます。SunoDownは会員情報を求めませんが、
            広告配信のためにGoogle AdSenseがクッキーを使用する場合があります。詳しくは
            <a href="/privacy">プライバシーポリシー</a>をご覧ください。
          </>
        ),
      },
    ],
    faqLink: 'すべてのFAQを読む →',
    faqUrl: '/ja/faq',
  },
};

export default function HomeGuide({ lang = 'en' }) {
  const copy = COPY[lang] || COPY.en;

  return (
    <>
      <section className="howto" aria-labelledby="home-howto-title">
        <h2 id="home-howto-title">{copy.howTitle}</h2>
        <p className="howto-intro">{copy.howIntro}</p>
        <ol className="steps">
          {copy.steps.map((s, i) => (
            <li key={i} className="step">
              <span className="step-n" aria-hidden="true">{i + 1}</span>
              <div className="step-t">
                <h3>{s.h}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="home-more"><a href={copy.guideUrl}>{copy.guideLink}</a></p>
      </section>

      <section className="home-features" aria-labelledby="home-features-title">
        <h2 id="home-features-title">{copy.featuresTitle}</h2>
        <ul className="feature-grid">
          {copy.features.map((f, i) => (
            <li key={i} className="feature-card">
              <h3>{f.h}</h3>
              <p>{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-faq" aria-labelledby="home-faq-title">
        <h2 id="home-faq-title">{copy.faqTitle}</h2>
        <div className="faq-list">
          {copy.faqs.map((f, i) => (
            <div key={i} className="faq-item">
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
        <p className="home-more"><a href={copy.faqUrl}>{copy.faqLink}</a></p>
      </section>
    </>
  );
}
