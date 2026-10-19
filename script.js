document.addEventListener('DOMContentLoaded', () => {
    const stageIntro = document.getElementById('stageIntro');
    const introSubtitle = document.getElementById('introSubtitle');
    const introActionBox = document.getElementById('introActionBox');
    const pickGiftBtn = document.getElementById('pickGiftBtn');

    const stageBloom = document.getElementById('stageBloom');
    const stageWishSuccess = document.getElementById('stageWishSuccess');
    const resetBtn = document.getElementById('resetBtn');

    const videoBtn = document.getElementById('videoBtn');
    const photoAlbumBtn = document.getElementById('photoAlbumBtn');
    const catchStarBtn = document.getElementById('catchStarBtn');
    const fortuneBtn = document.getElementById('fortuneBtn');
    const flowerGardenBtn = document.getElementById('flowerGardenBtn');
    const changeQuoteBtn = document.getElementById('changeQuoteBtn');

    const galaxyModal = document.getElementById('galaxyModal');
    const closeGalaxyModal = document.getElementById('closeGalaxyModal');
    const videoModal = document.getElementById('videoModal');
    const closeVideoModal = document.getElementById('closeVideoModal');
    const backToGalaxyFromVideoBtn = document.getElementById('backToGalaxyFromVideoBtn');

    const catchStarModal = document.getElementById('catchStarModal');
    const closeCatchStarModal = document.getElementById('closeCatchStarModal');
    const startStarGameBtn = document.getElementById('startStarGameBtn');
    const starScoreText = document.getElementById('starScoreText');
    const secretStarMsg = document.getElementById('secretStarMsg');
    const starGameArea = document.getElementById('starGameArea');

    const photoModal = document.getElementById('photoModal');
    const closePhotoModal = document.getElementById('closePhotoModal');
    const fortuneModal = document.getElementById('fortuneModal');
    const closeFortuneModal = document.getElementById('closeFortuneModal');
    const gardenModal = document.getElementById('gardenModal');
    const closeGardenModal = document.getElementById('closeGardenModal');
    const letterModal = document.getElementById('letterModal');
    const closeLetterModal = document.getElementById('closeLetterModal');

    const backHomeFromFortuneBtn = document.getElementById('backHomeFromFortuneBtn');
    const backHomeFromGardenBtn = document.getElementById('backHomeFromGardenBtn');

    const shootingStar = document.getElementById('shootingStar');
    const pageWishDisplayText = document.getElementById('pageWishDisplayText');
    const backToMainFromWish = document.getElementById('backToMainFromWish');

    const planetItems = document.querySelectorAll('.planet-item');
    const galaxyMainView = document.getElementById('galaxyMainView');
    const starDetailView = document.getElementById('starDetailView');
    const realmIcon = document.getElementById('realmIcon');
    const realmTitle = document.getElementById('realmTitle');
    const realmMessage = document.getElementById('realmMessage');
    const backToStarsBtn = document.getElementById('backToStarsBtn');

    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const soundIcon = document.getElementById('soundIcon');
    const soundTooltip = soundToggleBtn.querySelector('.sound-tooltip');
    const bgMusic = document.getElementById('bgMusic');
    const capcutVideoPlayer = document.getElementById('capcutVideoPlayer');

    const fallingPetalsContainer = document.getElementById('fallingPetalsContainer');
    const meteorRainContainer = document.getElementById('meteorRainContainer');
    const firefliesContainer = document.getElementById('firefliesContainer');

    const magicDustContainer = document.getElementById('magicDustContainer');
    const gardenPetalsContainer = document.getElementById('gardenPetalsContainer');
    const videoStarsContainer = document.getElementById('videoStarsContainer');
    const photoStarsContainer = document.getElementById('photoStarsContainer');
    const galaxyStarsContainer = document.getElementById('galaxyStarsContainer');
    const letterStarsContainer = document.getElementById('letterStarsContainer');
    const footprintsContainer = document.getElementById('footprintsContainer');

    const userWishInput = document.getElementById('userWishInput');
    const sendWishBtn = document.getElementById('sendWishBtn');

    let isMusicPlaying = false;
    let caughtStarCount = 0;
    let starGameInterval = null;

    // --- DANH SÁCH LỜI NHẮN BÍ MẬT HÁI SAO (NGẪU NHIÊN KHÔNG TRÙNG LẶP) ---
    const secretStarMessages = [
        "🎉 Chúc mừng bạn đã hái đủ 5 ngôi sao! Lời nhắn ẩn: 'Chúc bạn luôn là ngôi sao rạng rỡ và đẹp đẽ nhất trong lòng mình!' ❤️",
        "✨ Phép màu từ 5 ngôi sao: 'Mong rằng mỗi ngày trôi qua của bạn đều dịu dàng, bình an và ngập tràn niềm vui!' 💖",
        "🌟 Bí mật Dải Ngân Hà: 'Bạn sinh ra để tỏa sáng, hãy luôn tự tin và kiêu hãnh tiến về phía trước nhé!' 🌹",
        "💫 Lời nguyện ước hoàn thành: 'Chúc cho mọi ước mơ ngọt ngào nhất của bạn đều sớm trở thành hiện thực!' 💎",
        "👑 Ngôi Sao May Mắn: 'Cảm ơn sự xuất hiện của bạn đã làm cho thế giới xung quanh trở nên tuyệt vời hơn!' 🌸",
        "🔮 Thông điệp huyền bí: 'Dù vũ trụ có bao la đến đâu, vẻ đẹp và nụ cười của bạn vẫn là điều duy nhất thu hút mình!' ✨"
    ];

    let lastStarMsgIndex = -1;

    // --- LOGIC GAME HÁI SAO (GIỚI HẠN 5 SAO & TỰ ĐỘNG DỪNG) ---
    function resetStarGame() {
        caughtStarCount = 0;
        if (starScoreText) starScoreText.textContent = '0';
        if (secretStarMsg) secretStarMsg.textContent = "Hãy chạm nhanh vào các ngôi sao rơi để hái đủ 5 sao...";
        if (starGameInterval) clearInterval(starGameInterval);
        if (starGameArea) {
            const oldStars = starGameArea.querySelectorAll('.falling-star-game-item');
            oldStars.forEach(s => s.remove());
        }
    }

    function spawnFallingStarForGame() {
        if (!catchStarModal || !catchStarModal.classList.contains('show')) return;
        
        if (caughtStarCount >= 5) {
            if (starGameInterval) clearInterval(starGameInterval);
            return;
        }

        const star = document.createElement('div');
        star.className = 'falling-star-game-item';
        star.textContent = ['⭐', '🌟', '✨', '💫'][Math.floor(Math.random() * 4)];
        
        star.style.left = `${Math.random() * 70 + 10}%`;
        const fallDuration = Math.random() * 2 + 5.5;
        star.style.animationDuration = `${fallDuration}s`;

        function handleStarClick(e) {
            e.stopPropagation();
            e.preventDefault();

            if (caughtStarCount >= 5 || star.dataset.clicked) return;
            star.dataset.clicked = "true";

            caughtStarCount++;
            if (starScoreText) starScoreText.textContent = caughtStarCount;

            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth / 2);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight / 2);
            createHeartBurst(clientX, clientY, 40);

            star.remove();

            if (caughtStarCount >= 5) {
                if (starGameInterval) clearInterval(starGameInterval);

                if (starGameArea) {
                    const remainingStars = starGameArea.querySelectorAll('.falling-star-game-item');
                    remainingStars.forEach(s => s.remove());
                }

                let randIdx;
                do {
                    randIdx = Math.floor(Math.random() * secretStarMessages.length);
                } while (randIdx === lastStarMsgIndex && secretStarMessages.length > 1);
                
                lastStarMsgIndex = randIdx;

                if (secretStarMsg) {
                    secretStarMsg.textContent = secretStarMessages[randIdx];
                }

                createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 100);
            }
        }

        star.addEventListener('pointerdown', handleStarClick);
        star.addEventListener('touchstart', handleStarClick, { passive: false });
        star.addEventListener('click', handleStarClick);

        if (starGameArea) starGameArea.appendChild(star);

        setTimeout(() => {
            if (star && star.parentNode) {
                star.remove();
            }
        }, fallDuration * 1000);
    }

    if (catchStarBtn) {
        catchStarBtn.addEventListener('click', () => {
            resetStarGame();
            catchStarModal.classList.add('show');
            createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 50);
        });
    }

    if (startStarGameBtn) {
        startStarGameBtn.addEventListener('click', () => {
            resetStarGame();
            if (secretStarMsg) secretStarMsg.textContent = "⭐ Các ngôi sao đang rơi rất chậm! Hãy chạm vào sao...";
            starGameInterval = setInterval(spawnFallingStarForGame, 800);
            createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 40);
        });
    }

    if (closeCatchStarModal) {
        closeCatchStarModal.addEventListener('click', () => {
            catchStarModal.classList.remove('show');
            resetStarGame();
        });
    }

    // --- CHUYỂN LUỒNG TỰ ĐỘNG TỪ VIDEO ➔ MỞ VŨ TRỤ LỜI CHÚC ---
    function openGalaxyFromVideo() {
        videoModal.classList.remove('show');
        if (capcutVideoPlayer) capcutVideoPlayer.pause();
        if (isMusicPlaying) {
            bgMusic.play().then(() => {
                soundIcon.className = "fa-solid fa-volume-high";
                soundTooltip.textContent = "Đang phát nhạc 🎶";
            }).catch(e => console.log(e));
        }

        galaxyMainView.classList.add('active');
        starDetailView.classList.remove('active');
        galaxyModal.classList.add('show');
        createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 80);
    }

    if (backToGalaxyFromVideoBtn) {
        backToGalaxyFromVideoBtn.addEventListener('click', openGalaxyFromVideo);
    }

    if (capcutVideoPlayer) {
        capcutVideoPlayer.addEventListener('ended', () => {
            setTimeout(openGalaxyFromVideo, 800);
        });
    }

    // --- TẠO DẤU CHÂN LẤP LÁNH KHI CHẠY ---
    function spawnFootprints() {
        if (!footprintsContainer) return;
        let step = 0;
        const totalSteps = 10;
        const interval = setInterval(() => {
            if (step >= totalSteps) {
                clearInterval(interval);
                return;
            }
            const footprint = document.createElement('div');
            footprint.className = 'footprint-sparkle';
            footprint.textContent = '✨';
            footprint.style.left = `${(step * 4.2) + 5}%`;
            footprintsContainer.appendChild(footprint);
            setTimeout(() => footprint.remove(), 1200);
            step++;
        }, 180);
    }
    spawnFootprints();

    // --- TẠO ĐOM ĐÓM BAY LƯỢN NỀN ---
    function createFirefly() {
        if (!firefliesContainer) return;
        const f = document.createElement('div');
        f.className = 'firefly';
        f.style.left = `${Math.random() * window.innerWidth}px`;
        f.style.animationDuration = `${Math.random() * 4 + 3}s`;
        firefliesContainer.appendChild(f);
        setTimeout(() => f.remove(), 7000);
    }
    setInterval(createFirefly, 400);

    // --- HIỆU ỨNG GỢN SÓNG KHI CLICK ---
    window.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'VIDEO') return;
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);

        createHeartBurst(e.clientX, e.clientY);
    });

    // --- PHÁO HOA TỎA SÁNG ---
    function createHeartBurst(x, y, count = 35) {
        const colorsList = ['#ffd700', '#ff4081', '#ff80ab', '#ffffff', '#ff1744'];
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.style.position = 'fixed';
            p.style.left = `${x}px`;
            p.style.top = `${y}px`;
            p.style.width = `${Math.random() * 8 + 6}px`;
            p.style.height = p.style.width;
            p.style.backgroundColor = colorsList[Math.floor(Math.random() * colorsList.length)];
            p.style.borderRadius = '50%';
            p.style.pointerEvents = 'none';
            p.style.zIndex = '9999';
            p.style.boxShadow = '0 0 12px #ffd700';
            document.body.appendChild(p);

            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 180 + 40;

            p.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`, opacity: 0 }
            ], {
                duration: Math.random() * 900 + 400,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            }).onfinish = () => p.remove();
        }
    }

    setTimeout(() => {
        if (introSubtitle) introSubtitle.textContent = "Đã nhặt và nâng giơ món quà kỳ diệu lên trời! ✨";
        if (introActionBox) introActionBox.classList.add('show');
        createHeartBurst(window.innerWidth / 2, window.innerHeight / 2 - 40, 80);
    }, 3700);

    if (pickGiftBtn) {
        pickGiftBtn.addEventListener('click', () => {
            if (!isMusicPlaying) {
                bgMusic.play().then(() => {
                    isMusicPlaying = true;
                    soundIcon.className = "fa-solid fa-volume-high";
                    soundTooltip.textContent = "Đang phát nhạc 🎶";
                }).catch(e => console.log(e));
            }

            createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 100);
            stageIntro.classList.remove('active');
            stageBloom.classList.add('active');
        });
    }

    // --- ALBUM ẢNH KỶ NIỆM (4 ẢNH) ---
    const photoList = [
        { url: "anh1.jpg", caption: "Đóa hoa rực rỡ nhất 🌸" },
        { url: "anh2.jpg", caption: "Nụ cười tỏa nắng ✨" },
        { url: "anh3.jpg", caption: "Khoảnh khắc ngọt ngào ❤️" },
        { url: "anh4.jpg", caption: "Kỷ niệm xinh đẹp 💖" }
    ];

    let currentPhotoIdx = 0;
    const sliderImage = document.getElementById('sliderImage');
    const photoCaption = document.getElementById('photoCaption');
    const prevPhotoBtn = document.getElementById('prevPhotoBtn');
    const nextPhotoBtn = document.getElementById('nextPhotoBtn');

    function updatePhoto() {
        if (sliderImage && photoCaption) {
            sliderImage.src = photoList[currentPhotoIdx].url;
            photoCaption.textContent = photoList[currentPhotoIdx].caption;
        }
    }

    if (prevPhotoBtn && nextPhotoBtn) {
        prevPhotoBtn.addEventListener('click', () => {
            currentPhotoIdx = (currentPhotoIdx - 1 + photoList.length) % photoList.length;
            updatePhoto();
            createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 25);
        });

        nextPhotoBtn.addEventListener('click', () => {
            currentPhotoIdx = (currentPhotoIdx + 1) % photoList.length;
            updatePhoto();
            createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 25);
        });
    }

    soundToggleBtn.addEventListener('click', () => {
        if (!isMusicPlaying) {
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                soundIcon.className = "fa-solid fa-volume-high";
                soundTooltip.textContent = "Đang phát nhạc 🎶";
            }).catch(e => console.log(e));
        } else {
            bgMusic.pause();
            isMusicPlaying = false;
            soundIcon.className = "fa-solid fa-music";
            soundTooltip.textContent = "Bật nhạc nền 🎵";
        }
    });

    const petalSymbols = ['🌸', '🌹', '✨', '💎', '💮'];
    function createFallingPetal() {
        const petal = document.createElement('div');
        petal.className = 'falling-petal';
        petal.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
        petal.style.left = `${Math.random() * window.innerWidth}px`;
        petal.style.fontSize = `${Math.random() * 14 + 14}px`;
        petal.style.animationDuration = `${Math.random() * 5 + 4}s`;
        fallingPetalsContainer.appendChild(petal);
        setTimeout(() => petal.remove(), 8000);
    }
    setInterval(createFallingPetal, 350);

    function createMeteorDrop() {
        if (!meteorRainContainer) return;
        const drop = document.createElement('div');
        drop.className = 'meteor-drop';
        drop.style.left = `${Math.random() * window.innerWidth}px`;
        drop.style.top = `${Math.random() * -150}px`;
        const length = Math.random() * 90 + 50;
        const thickness = Math.random() * 2 + 1;
        drop.style.width = `${length}px`;
        drop.style.height = `${thickness}px`;
        drop.style.animationDuration = `${Math.random() * 1.2 + 0.8}s`;
        drop.style.animationDelay = `${Math.random() * 4}s`;
        meteorRainContainer.appendChild(drop);
        setTimeout(() => drop.remove(), 2500);
    }
    setInterval(createMeteorDrop, 150);

    const glowStarSymbols = ['✨', '⭐', '🌟', '💎', '✦', '💫'];
    function createOuterGlowStar(targetContainer, isModalActive) {
        if (!isModalActive || !targetContainer) return;
        const star = document.createElement('div');
        star.className = 'outer-glowing-star';
        star.textContent = glowStarSymbols[Math.floor(Math.random() * glowStarSymbols.length)];
        star.style.left = `${Math.random() * 100}%`;
        star.style.fontSize = `${Math.random() * 20 + 14}px`;
        star.style.animationDuration = `${Math.random() * 2.5 + 2}s`;
        targetContainer.appendChild(star);
        setTimeout(() => star.remove(), 4500);
    }

    setInterval(() => createOuterGlowStar(videoStarsContainer, videoModal.classList.contains('show')), 120);
    setInterval(() => createOuterGlowStar(photoStarsContainer, photoModal.classList.contains('show')), 120);
    setInterval(() => createOuterGlowStar(galaxyStarsContainer, galaxyModal.classList.contains('show')), 120);
    setInterval(() => createOuterGlowStar(letterStarsContainer, letterModal.classList.contains('show')), 120);

    function createMagicSparkle() {
        if (!fortuneModal.classList.contains('show')) return;
        const sparkle = document.createElement('div');
        sparkle.className = 'magic-sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        const size = Math.random() * 12 + 6;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.animationDuration = `${Math.random() * 2 + 2}s`;
        magicDustContainer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 4000);
    }
    setInterval(createMagicSparkle, 120);

    const gardenIcons = ['🌸', '🌷', '🌺', '🍃', '🌿', '✨'];
    function createGardenPetal() {
        if (!gardenModal.classList.contains('show')) return;
        const petal = document.createElement('div');
        petal.className = 'garden-leaf-petal';
        petal.textContent = gardenIcons[Math.floor(Math.random() * gardenIcons.length)];
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.top = `-20px`;
        petal.style.fontSize = `${Math.random() * 18 + 16}px`;
        petal.style.animationDuration = `${Math.random() * 3 + 3}s`;
        gardenPetalsContainer.appendChild(petal);
        setTimeout(() => petal.remove(), 6000);
    }
    setInterval(createGardenPetal, 150);

    const starRealms = [
        { icon: "🌹", title: "Tinh Cầu Tình Yêu & Sắc Đẹp", message: "✨ Chúc bạn luôn rạng rỡ, tự tin và tỏa sáng như đóa hồng kiêu sa nhất!" },
        { icon: "💖", title: "Tinh Cầu Hạnh Phúc & Bình An", message: "🌟 Chúc bạn luôn được yêu thương vô điều kiện và ngập tràn nụ cười ấm áp!" },
        { icon: "💎", title: "Tinh Cầu Thành Công Rực Rỡ", message: "🌷 Mong mọi ước mơ và dự định của bạn đều thuận buồm xuôi gió!" },
        { icon: "🌙", title: "Tinh Cầu Phép Màu & May Mắn", message: "💫 Chúc bạn một đời bình an, mỗi bước chân đi qua đều là hoa ngập lối!" },
        { icon: "⭐", title: "Tinh Cầu Thanh Xuân Tươi Trẻ", message: "🎉 Chúc bạn mãi giữ được năng lượng tích cực và luôn hạnh phúc trọn vẹn!" }
    ];

    // --- DATA LỜI NGUYỀN HẮC ÁM (ĐEN TỐI & LẦY LỘI) ---
    const fortunes = [
      "🍀 Quẻ Phúc Lộc: May mắn gõ cửa, tiền tài đầy túi!",
"💖 Quẻ Đào Hoa: Có người thầm thương trộm nhớ bạn!",
"💰 Quẻ Thần Tài: Sắp có lộc bất ngờ, ví tiền khởi sắc!",
"🌟 Quẻ Sao May: Vận may tới, làm gì cũng thuận lợi!",
"🧧 Quẻ Bình An: Một ngày vui vẻ, mọi chuyện hanh thông!",
"🌑 Quẻ Vận Xui: Làm gì cũng lệch nhịp, xui nhẹ cả ngày!",
"💸 Quẻ Ví Rỗng: Tiền vừa về đã có chỗ để đi!",
"👻 Quẻ Deadline: Việc chưa xong, drama đã tới!",
"💔 Quẻ Tình Duyên: Nhắn tin cả ngày, người ta vẫn bặt vô âm tín!",
"🕷️ Quẻ Xui Tận Mạng: Định ngủ sớm nhưng lại thức tới sáng!"
    ];

    const spinFortuneBtn = document.getElementById('spinFortuneBtn');
    const fortuneResultText = document.getElementById('fortuneResultText');
    const crystalBall = document.getElementById('crystalBall');
    let isShakingFortune = false;
    let lastFortuneIndex = -1;

    function shakeAndDrawFortune() {
        if (isShakingFortune) return;
        isShakingFortune = true;

        crystalBall.classList.add('shaking');
        spinFortuneBtn.disabled = true;
        spinFortuneBtn.style.opacity = '0.6';
        fortuneResultText.textContent = "🔮 Đang thỉnh quẻ bói... Xin hãy đợi thế lực hắc ám!";
        
        createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 40);

        setTimeout(() => {
            crystalBall.classList.remove('shaking');
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * fortunes.length);
            } while (randomIndex === lastFortuneIndex && fortunes.length > 1);
            
            lastFortuneIndex = randomIndex;
            fortuneResultText.textContent = fortunes[randomIndex];
            
            createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 70);
            spinFortuneBtn.disabled = false;
            spinFortuneBtn.style.opacity = '1';
            isShakingFortune = false;
        }, 1200);
    }

    spinFortuneBtn.addEventListener('click', shakeAndDrawFortune);
    crystalBall.addEventListener('click', shakeAndDrawFortune);

    const flowerMessages = [
        "🌹 Hoa Hồng: 'Tình yêu và niềm vui sẽ luôn ngập tràn trong từng khoảnh khắc cuộc sống của bạn!'",
        "🌻 Hướng Dương: 'Luôn hướng về phía ánh mặt trời, rạng rỡ, tự tin và kiêu hãnh nhé!'",
        "🌷 Hoa Tulip: 'Một tình yêu thuần khiết, dịu dàng và bình an nhất sẽ luôn đồng hành cùng bạn!'",
        "💐 Cẩm Tú Cầu: 'Cảm ơn vì đã luôn mang lại sự ấm áp và hạnh phúc cho mọi người xung quanh!'"
    ];

    const flowerCards = document.querySelectorAll('.flower-card-item');
    const flowerSecretMsg = document.getElementById('flowerSecretMsg');

    flowerCards.forEach(card => {
        card.addEventListener('click', () => {
            const idx = card.getAttribute('data-flower');
            flowerSecretMsg.textContent = flowerMessages[idx];
            const rect = card.getBoundingClientRect();
            createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);
        });
    });

    const tiltCards = document.querySelectorAll('.tilt-card');
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 20;
        const y = (window.innerHeight / 2 - e.clientY) / 20;
        tiltCards.forEach(card => card.style.transform = `rotateY(${-x}deg) rotateX(${y}deg)`);
    });

    videoBtn.addEventListener('click', () => {
        videoModal.classList.add('show');
        if (isMusicPlaying) bgMusic.pause();
        if (capcutVideoPlayer) {
            capcutVideoPlayer.currentTime = 0;
            capcutVideoPlayer.play().catch(e => console.log(e));
        }
        createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 50);
    });

    closeVideoModal.addEventListener('click', () => {
        videoModal.classList.remove('show');
        if (capcutVideoPlayer) capcutVideoPlayer.pause();
        if (isMusicPlaying) bgMusic.play().catch(e => console.log(e));
    });

    photoAlbumBtn.addEventListener('click', () => {
        photoModal.classList.add('show');
        updatePhoto();
        createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 50);
    });
    closePhotoModal.addEventListener('click', () => photoModal.classList.remove('show'));

    fortuneBtn.addEventListener('click', () => {
        fortuneModal.classList.add('show');
        createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 50);
    });
    closeFortuneModal.addEventListener('click', () => fortuneModal.classList.remove('show'));
    backHomeFromFortuneBtn.addEventListener('click', () => fortuneModal.classList.remove('show'));

    flowerGardenBtn.addEventListener('click', () => {
        gardenModal.classList.add('show');
        createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 50);
    });
    closeGardenModal.addEventListener('click', () => gardenModal.classList.remove('show'));
    backHomeFromGardenBtn.addEventListener('click', () => gardenModal.classList.remove('show'));

    changeQuoteBtn.addEventListener('click', () => {
        letterModal.classList.add('show');
        createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 50);
    });
    closeLetterModal.addEventListener('click', () => letterModal.classList.remove('show'));

    closeGalaxyModal.addEventListener('click', () => galaxyModal.classList.remove('show'));

    planetItems.forEach(planet => {
        planet.addEventListener('click', () => {
            const index = planet.getAttribute('data-index');
            const realm = starRealms[index];
            realmIcon.textContent = realm.icon;
            realmTitle.textContent = realm.title;
            realmMessage.textContent = realm.message;
            galaxyMainView.classList.remove('active');
            starDetailView.classList.add('active');
            const rect = planet.getBoundingClientRect();
            createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 60);
        });
    });

    backToStarsBtn.addEventListener('click', () => {
        starDetailView.classList.remove('active');
        galaxyMainView.classList.add('active');
    });

    sendWishBtn.addEventListener('click', () => {
        const wishText = userWishInput.value.trim();
        if (wishText) {
            letterModal.classList.remove('show');
            userWishInput.value = '';

            shootingStar.classList.remove('active');
            void shootingStar.offsetWidth;
            shootingStar.classList.add('active');

            createHeartBurst(window.innerWidth / 2, window.innerHeight / 3, 90);

            setTimeout(() => {
                pageWishDisplayText.textContent = `"${wishText}"`;
                stageBloom.classList.remove('active');
                stageWishSuccess.classList.add('active');
                createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 70);
            }, 1000);
        }
    });

    backToMainFromWish.addEventListener('click', () => {
        stageWishSuccess.classList.remove('active');
        stageBloom.classList.add('active');
    });

    resetBtn.addEventListener('click', () => {
        stageBloom.classList.remove('active');
        stageIntro.classList.add('active');
        const runnerPerson = document.getElementById('runnerPerson');
        const groundGift = document.getElementById('groundGift');
        if (runnerPerson && groundGift) {
            runnerPerson.style.animation = 'none';
            groundGift.style.animation = 'none';
            void runnerPerson.offsetWidth;
            void groundGift.offsetWidth;
            runnerPerson.style.animation = 'smoothRunAndPickRight 3.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
            groundGift.style.animation = 'smoothGiftLift 3.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
            spawnFootprints();
        }
    });

    // THREE.JS NỀN SAO 3D
    const container = document.getElementById('webgl3dCanvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const particlesCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 25;
        positions[i + 1] = (Math.random() - 0.5) * 25;
        positions[i + 2] = (Math.random() - 0.5) * 25;
        colors[i] = 1.0;
        colors[i + 1] = Math.random() * 0.5 + 0.4;
        colors[i + 2] = Math.random() * 0.8 + 0.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ size: 0.09, vertexColors: true, transparent: true, opacity: 0.85 });
    const starField = new THREE.Points(geometry, material);
    scene.add(starField);
    camera.position.z = 5;

    function animate3D() {
        requestAnimationFrame(animate3D);
        starField.rotation.x += 0.0012;
        starField.rotation.y += 0.0018;
        renderer.render(scene, camera);
    }
    animate3D();
});