const COPY = {
  ko: {
    sectionTitle: '왜 Suno 라이브러리를 직접 백업해야 할까?',
    intro: (
      <>
        Suno AI는 누구나 텍스트 프롬프트만으로 음악을 만들 수 있게 한 강력한 도구이지만,
        내가 생성한 곡은 결국 Suno 서버에 보관됩니다. 클라우드 의존에는 분명한 한계가 있고,
        본인이 만든 창작물에 대한 진짜 소유권은 <b>내 컴퓨터·외장 하드·개인 클라우드</b>에
        파일이 있을 때 비로소 확보됩니다.
      </>
    ),
    blocks: [
      {
        h: '1. 클라우드 의존의 한계 — 내 곡이 사라질 수 있는 시나리오',
        body: (
          <>
            AI 음악 플랫폼의 약관은 자주 바뀝니다. 무료 플랜이 축소되거나, 기존 곡 보관 기간이
            줄어들거나, 특정 카테고리의 곡이 일괄 삭제될 가능성은 언제나 있습니다.
            계정이 정책 위반으로 일시 정지되면 그 동안 만든 모든 곡에 접근할 수 없게 되고,
            서비스 자체가 종료되거나 인수·합병으로 정책이 뒤집히는 사례도 드물지 않습니다.
            <br /><br />
            가장 중요한 점은 <b>Suno의 생성 결과가 본질적으로 일회성</b>이라는 사실입니다.
            같은 프롬프트를 다시 입력해도 동일한 곡이 다시 만들어지지 않습니다.
            마음에 든 한 곡을 잃어버리면 복구가 불가능합니다. 이 비가역성 때문에
            로컬 백업은 단순한 편의 기능이 아니라 창작자의 기본 위생 수칙에 가깝습니다.
          </>
        ),
      },
      {
        h: '2. Suno Pro 구독자의 무손실 WAV 권리',
        body: (
          <>
            월 정액으로 Suno Pro 또는 Premier에 가입한 구독자는 자신이 생성한 곡의
            <b> 무손실 WAV 파일을 받을 권리</b>를 명시적으로 가지고 있습니다. 이는 부가 혜택이 아니라
            구독료에 포함된 핵심 가치 중 하나이며, 공식 인터페이스에서도 곡별로 WAV
            다운로드를 지원합니다.
            <br /><br />
            WAV는 MP3와 달리 압축으로 인한 손실이 없어 <b>DAW에서의 후처리</b>(Logic Pro,
            FL Studio, Ableton, Studio One 등에서의 마스터링·믹싱), <b>유튜브·SoundCloud 업로드</b>,
            <b> 영상 편집 BGM</b>으로 사용할 때 음질이 보존됩니다. 특히 한 번 MP3로 인코딩된 음원을
            다시 처리하면 누적 손실이 발생하므로, 후처리 가능성이 있다면 원본 WAV를 보관하는 편이
            장기적으로 유리합니다.
            <br /><br />
            다만 Suno 공식 사이트는 곡 단위로 WAV 다운로드를 제공할 뿐 플레이리스트 일괄 처리는
            지원하지 않아, 수십 곡짜리 라이브러리를 옮기려면 일일이 클릭해야 합니다.
            SunoDown은 본인이 이미 구독료를 지불하고 권리를 가진 콘텐츠에 더 효율적으로 접근할 수
            있게 해 주는 보조 도구로, 본인 라이브러리 일괄 백업을 돕는 데 초점이 맞춰져 있습니다.
          </>
        ),
      },
      {
        h: '3. 개인 청취·창작 자료로의 활용',
        body: (
          <>
            로컬에 저장된 음원은 인터넷 연결이 없는 상황에서도 들을 수 있습니다. 비행기 안,
            지하철, 캠핑장, 데이터를 아끼고 싶은 상황 — 일상의 청취 환경 상당 부분이
            여전히 오프라인입니다. 운동 플레이리스트, 집중·작업용 BGM, 드라이브 음악,
            잠들기 전 사이드 노이즈로 활용하는 데에도 로컬 파일이 가장 편리합니다.
            <br /><br />
            창작자에게는 단순한 청취 이상의 의미가 있습니다. AI 음악은 <b>본인의 창작 포트폴리오</b>이자
            영상 콘텐츠의 BGM 자료, 게임·앱의 사운드 트랙 후보, 혹은 다른 곡을 만들 때 영감을 얻는
            레퍼런스 라이브러리로 기능합니다. 이런 활용을 위해서는 검색·정리·태깅이 가능한 형태로
            손 안에 있어야 합니다.
            <br /><br />
            물론 이 모든 활용은 <b>본인이 생성한 곡</b>에 한해 정당합니다. 타인이 공개한
            플레이리스트의 곡은 해당 제작자의 저작권에 속하며, 상업적 사용이나 재배포는 별도의
            동의가 필요합니다. SunoDown은 도구를 제공할 뿐, 어떤 곡을 어떻게 사용할지에 대한
            책임은 사용자에게 있습니다. 본인 창작물의 백업과 개인적 청취 — 이 두 가지가
            도구의 기본 사용 시나리오입니다.
          </>
        ),
      },
    ],
    footnote: (
      <>
        💡 처음 사용하시나요? <a href="/ko/guide/how-to-download-suno-playlist">다운로드 방법 가이드</a>,
        <a href="/ko/guide/suno-mp3-vs-wav"> MP3 vs WAV 비교</a>,
        <a href="/ko/guide/suno-pro-cookie-setup"> Suno Pro 쿠키 설정</a>에서 자세한 사용법을 확인할 수 있습니다.
        AI 음악 제작 팁·장르·저작권·DAW 후처리 같은 주제는 <a href="/ko/blog">블로그</a>에서 다룹니다.
      </>
    ),
  },

  en: {
    sectionTitle: 'Why You Should Back Up Your Suno Library Locally',
    intro: (
      <>
        Suno AI lets anyone generate music from a text prompt, but every track you create
        ultimately lives on Suno's servers. Cloud-only storage has real limits — true ownership
        of your creations only kicks in once the files are sitting on
        <b> your own computer, external drive, or personal cloud</b>.
      </>
    ),
    blocks: [
      {
        h: '1. The limits of cloud-only storage',
        body: (
          <>
            Terms of service on AI music platforms change frequently. Free plans get trimmed,
            retention windows shrink, and entire categories of content can be removed for policy
            reasons. A temporary account suspension cuts you off from everything you've made,
            and platform sunsets, acquisitions, or pivots have happened more than once in this
            space already.
            <br /><br />
            More fundamentally, <b>Suno generations are essentially one-shot</b>. Re-entering
            the same prompt does not give you the same song back. If you lose a track you love,
            there is no way to regenerate it. This irreversibility is the real reason local
            backup matters — it's not a convenience feature, it's basic creative hygiene.
          </>
        ),
      },
      {
        h: '2. The lossless-WAV right that comes with Suno Pro',
        body: (
          <>
            Suno Pro and Premier subscribers explicitly have the right to download
            <b> lossless WAV files</b> of their own generated tracks. This is not a bonus — it's
            part of what the subscription pays for, and the official UI exposes WAV downloads
            on a per-track basis.
            <br /><br />
            Unlike MP3, WAV preserves the full signal, which matters when you take a track into
            a <b>DAW for post-production</b> (mastering or remixing in Logic Pro, FL Studio,
            Ableton, Studio One), upload to <b>YouTube or SoundCloud</b>, or use it as
            <b> background music in a video edit</b>. Re-encoding an MP3 introduces cumulative
            quality loss, so if there's any chance you'll process the audio further, keeping the
            original WAV is the safer long-term call.
            <br /><br />
            The catch: Suno's official site provides WAV downloads one track at a time,
            with no built-in playlist export. Moving a library of dozens of songs means dozens
            of clicks. SunoDown exists to make it easier to access content you have already
            paid for and have rights to — its core scope is helping subscribers bulk-back-up
            their own library.
          </>
        ),
      },
      {
        h: '3. Personal listening and creative reference',
        body: (
          <>
            Local files are the most reliable way to listen offline — on a plane, on the subway,
            on a camping trip, or any time you'd rather not burn mobile data. Workout playlists,
            focus background music, drive music, sleep-time ambient — a meaningful slice of
            everyday listening still happens away from a live internet connection.
            <br /><br />
            For creators, the case goes further. The tracks you generate become a
            <b> personal creative portfolio</b>, a stock library for video BGM, candidate
            soundtracks for games or apps, or simply a reference library you reach for when
            making new music. To use them like that, the files have to be searchable,
            organisable, and tagged — which means they have to be on your machine.
            <br /><br />
            All of these scenarios apply specifically to <b>tracks you generated yourself</b>.
            Songs from other people's public playlists belong to their creators; commercial use
            or redistribution requires their permission. SunoDown only provides the tooling —
            how it gets used is the user's responsibility. Backing up your own creations and
            personal listening are the intended use cases.
          </>
        ),
      },
    ],
    footnote: (
      <>
        💡 New here? See our <a href="/guide/how-to-download-suno-playlist">step-by-step download guide</a>,
        <a href="/guide/suno-mp3-vs-wav"> MP3 vs WAV comparison</a>, and
        <a href="/guide/suno-pro-cookie-setup"> Suno Pro cookie setup walkthrough</a> for details.
        Deeper topics — lyrics prompting, AI music genres, copyright, DAW post-processing — live on the <a href="/blog">blog</a>.
      </>
    ),
  },

  ja: {
    sectionTitle: 'なぜSunoライブラリをローカルにバックアップすべきか',
    intro: (
      <>
        Suno AIはテキストプロンプトだけで音楽を生成できる強力なツールですが、
        作成した曲は最終的にSunoのサーバー上に保管されています。クラウド依存には限界があり、
        本当の意味で自分の創作物を所有していると言えるのは、
        <b>自分のPC・外付けドライブ・個人クラウド</b>にファイルが存在しているときだけです。
      </>
    ),
    blocks: [
      {
        h: '1. クラウドだけに頼ることの限界',
        body: (
          <>
            AI音楽プラットフォームの利用規約は頻繁に変わります。無料プランの縮小、保存期間の短縮、
            特定カテゴリの曲が一括削除されるなどのリスクは常に存在します。
            ポリシー違反でアカウントが一時停止されれば、これまで作った全ての曲にアクセスできなくなり、
            サービス自体が終了したり、買収によって方針が一変するケースもこの業界では珍しくありません。
            <br /><br />
            さらに重要なのは、<b>Sunoの生成結果は基本的に一回限り</b>であるという事実です。
            同じプロンプトを再入力しても同じ曲は出てきません。気に入った曲を失えば復元は不可能で、
            この不可逆性こそがローカルバックアップを単なる利便性ではなく、
            創作者にとっての基本衛生にしている理由です。
          </>
        ),
      },
      {
        h: '2. Suno Pro加入者の無損失WAVを受け取る権利',
        body: (
          <>
            月額プランでSuno ProまたはPremierに加入しているユーザーは、自分が生成した曲の
            <b>無損失WAVファイルを受け取る権利</b>を明示的に持っています。
            これは付加サービスではなく、サブスクリプション料金に含まれた中核的な価値であり、
            公式インターフェースも曲ごとのWAVダウンロードを提供しています。
            <br /><br />
            WAVはMP3と違って圧縮による損失がないため、<b>DAWでの後処理</b>
            （Logic Pro、FL Studio、Ableton、Studio Oneなどでのマスタリング・ミキシング）、
            <b>YouTube・SoundCloudへのアップロード</b>、<b>動画編集用BGM</b>として使う際に
            音質が維持されます。MP3として一度エンコードされた音源を再処理すると累積的な品質低下が
            発生するため、後処理の可能性があるなら原本のWAVを保管しておく方が長期的に有利です。
            <br /><br />
            ただし、Suno公式サイトのWAVダウンロードは曲単位でしか提供されず、
            プレイリスト一括処理はサポートされていません。数十曲のライブラリを移すには
            その分クリック作業が必要です。SunoDownは既に料金を支払って権利を持っているコンテンツに
            より効率的にアクセスできるようにする補助ツールで、本人のライブラリ一括バックアップに
            焦点を置いています。
          </>
        ),
      },
      {
        h: '3. 個人鑑賞・創作素材としての活用',
        body: (
          <>
            ローカルに保存された音源は、インターネット接続がない環境でも再生できます。
            飛行機内、地下鉄、キャンプ場、モバイルデータを節約したいとき —
            日常の鑑賞シーンの相当部分は今もオフラインです。
            ワークアウト用プレイリスト、集中・作業用BGM、ドライブ音楽、就寝前のアンビエントとして
            使うにもローカルファイルが最も便利です。
            <br /><br />
            創作者にとっては鑑賞以上の意味があります。AI音楽は<b>個人の創作ポートフォリオ</b>であり、
            動画コンテンツのBGM素材、ゲーム・アプリのサウンドトラック候補、
            あるいは新しい曲を作る際の参考用ライブラリとして機能します。こうした活用には
            検索・整理・タグ付けが可能な形で手元に置いておく必要があります。
            <br /><br />
            もちろん、これら全ての活用は<b>自分が生成した曲</b>に限って正当です。
            他人の公開プレイリストの曲は各制作者の著作権に属し、商用利用や再配布には別途の
            許諾が必要です。SunoDownはツールを提供するだけで、どの曲をどう使うかの責任は
            利用者にあります。自分の創作物のバックアップと個人鑑賞 — この2つが
            ツールの想定使用シナリオです。
          </>
        ),
      },
    ],
    footnote: (
      <>
        💡 初めての方は <a href="/ja/guide/how-to-download-suno-playlist">ダウンロード方法ガイド</a>、
        <a href="/ja/guide/suno-mp3-vs-wav"> MP3 vs WAV 比較</a>、
        <a href="/ja/guide/suno-pro-cookie-setup"> Suno Pro クッキー設定</a>で詳しい使い方を確認できます。
        歌詞プロンプト・ジャンル・著作権・DAW後処理などのトピックは <a href="/blog">Blog (EN)</a> に掲載しています。
      </>
    ),
  },
};

export default function BackupInfo({ lang = 'en' }) {
  const copy = COPY[lang] || COPY.en;

  return (
    <section className="backup-info" aria-labelledby="backup-info-title">
      <h2 id="backup-info-title">{copy.sectionTitle}</h2>
      <p className="backup-intro">{copy.intro}</p>
      <div className="backup-blocks">
        {copy.blocks.map((b, i) => (
          <article key={i} className="backup-block">
            <h3>{b.h}</h3>
            <p>{b.body}</p>
          </article>
        ))}
      </div>
      <p className="backup-footnote">{copy.footnote}</p>
    </section>
  );
}
