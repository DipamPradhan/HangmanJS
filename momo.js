(function () {
    var canvas = document.getElementById('smokeCanvas');
    var ctx = canvas.getContext('2d');
    var W = 140, H = 160;
    canvas.width = W;
    canvas.height = H;

    var puffs = [];

    function spawnPuff() {
        var cx = W * 0.25 + Math.random() * W * 0.5;
        puffs.push({
            x: cx,
            y: H - 5,
            originX: cx,
            size: 6 + Math.random() * 8,
            growRate: 0.12 + Math.random() * 0.15,
            life: 0,
            maxLife: 150 + Math.random() * 100,
            drift: (Math.random() - 0.5) * 0.2,
            wobbleAmp: 4 + Math.random() * 6,
            wobbleSpeed: 0.015 + Math.random() * 0.015,
            wobblePhase: Math.random() * Math.PI * 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        for (var i = puffs.length - 1; i >= 0; i--) {
            var p = puffs[i];
            p.life++;

            if (p.life >= p.maxLife) {
                puffs.splice(i, 1);
                continue;
            }

            var progress = p.life / p.maxLife;
            p.y -= 0.35;
            p.x = p.originX + Math.sin(p.life * p.wobbleSpeed + p.wobblePhase) * p.wobbleAmp + p.drift * p.life * 0.2;
            p.size += p.growRate;

            var fadeIn = Math.min(p.life / 25, 1);
            var fadeOut = progress < 0.45 ? 1 : 1 - (progress - 0.45) / 0.55;
            var a = fadeIn * fadeOut * 0.55;

            var grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            grad.addColorStop(0, 'rgba(185,185,185,' + a + ')');
            grad.addColorStop(0.35, 'rgba(175,175,175,' + (a * 0.7) + ')');
            grad.addColorStop(0.7, 'rgba(165,165,165,' + (a * 0.3) + ')');
            grad.addColorStop(1, 'rgba(160,160,160,0)');

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }

    function scheduleNext() {
        var delay = 300 + Math.random() * 500;
        setTimeout(function () {
            var count = 2 + Math.floor(Math.random() * 2);
            for (var i = 0; i < count; i++) spawnPuff();
            scheduleNext();
        }, delay);
    }

    scheduleNext();
    draw();
})();
