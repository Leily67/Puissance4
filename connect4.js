class Connect4 {
    //mise en place des options
    constructor(selector, row, col, p1, p2) {
        this.ROW = row;
        this.COL = col;
        this.p1 = p1;
        this.p2 = p2;
        this.selector = selector;
        this.player = p1;
        this.winner = 'empty';
        this.DrawMyGame();
        this.Color();
        this.score();
    }


    //creation de la grille
    DrawMyGame() {
        const $board = $(this.selector);
        $board.empty();
        // console.log($board);
        // ligne
        for (let row = 0; row < this.ROW; row++) {
            const $row = $('<div>')
                .addClass('row');
            //colonne  
            for (let col = 0; col < this.COL; col++) {
                const $col = $('<div>')
                    .addClass('col empty')
                    .attr('data-col', col)
                    .attr('data-row', row);
                $row.append($col);
            }
            $board.append($row);
        }
        // console.log($board.html());
    }

    //roulement des couleurs ALEEEEED !!!!
    Color() {
        const $board = $(this.selector);
        const that = this;

        function findLastEmptyCell(col) {

            const cells = $(`.col[data-col='${col}']`);
            for (let i = cells.length - 1; i >= 0; i--) {
                const $cell = $(cells[i]);
                if ($cell.hasClass('empty')) {
                    return $cell;
                }
            }
            return nulll;
            // console.log(cells);
        }
        //on prévisualise le placement par une couleur intermédiaire quand on place la souris sur l'axe choisie
        $board.on('mouseenter', '.col.empty', function() {
            //console.log('ici', this);
            const col = $(this).data('col');
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.addClass(`next-${that.player}`);
            //console.log(col);
            // console.log("lastEmptyCell: ", $lastEmptyCell);
        });
        //on "remove" la couleur intermédiaire quand on enleve la souris de l'axe choisie
        $board.on('mouseleave', '.col', function() {
            $('.col').removeClass(`next-${that.player}`);
        });

        //tour à tour entre jour 1 et 2
        $board.on('click', '.col.empty', function() {
            const col = $(this).data('col');
            const row = $(this).data('row');
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.removeClass(`empty next-${that.player}`);
            $lastEmptyCell.addClass(that.player);

            that.player = (that.player === that.p1) ? that.p2 : that.p1;
            that.Victory();
            $(this).trigger('mouseenter');
        });
    }

    GetCaseColor(x, y) {
            const cell = $(`.col[data-col='${x}'][data-row='${y}']`);
            if (cell.hasClass(this.p1)) {
                return this.p1;
            } else if (cell.hasClass(this.p2)) {
                return this.p2;
            } else {
                return 'empty';
            }
        }
        //victoire horizontal
    WinForRow() {
        for (let row = 0; row < this.ROW; row++) {
            for (let col = this.COL - 1; col >= 3; col--) {
                const a = this.GetCaseColor(col, row)
                const b = this.GetCaseColor(col - 1, row)
                const c = this.GetCaseColor(col - 2, row)
                const d = this.GetCaseColor(col - 3, row)
                if (a == b && a == c && a == d && a != "empty") {
                    return a;

                }
            }
        }
        return 'empty';
    }

    //victoire vertical
    WinForCol() {
        for (let col = 0; col < this.COL; col++) {
            for (let row = this.ROW - 1; row >= 3; row--) {
                const a = this.GetCaseColor(col, row)
                const b = this.GetCaseColor(col, row - 1)
                const c = this.GetCaseColor(col, row - 2)
                const d = this.GetCaseColor(col, row - 3)
                if (a == b && a == c && a == d && a != "empty") {
                    return a;

                }
            }
        }
        return 'empty';
    }

    //victoire diagonal1
    WinForDiag1() {
        for (let row = 0; row < this.ROW; row++) {
            for (let col = this.COL - 1; col >= 3; col--) {
                const a = this.GetCaseColor(col, row)
                const b = this.GetCaseColor(col - 1, row - 1)
                const c = this.GetCaseColor(col - 2, row - 2)
                const d = this.GetCaseColor(col - 3, row - 3)
                if (a == b && a == c && a == d && a != "empty") {
                    return a;
                }
            }
        }
        return 'empty';

    }

    //victoire diagonal2
    WinForDiag2() {

    }

    // on check la win - Message pour la fin de game + début de nouvelle partie
    Victory() {
        this.winner = this.WinForCol();
        if (this.winner == 'empty') {
            this.winner = this.WinForRow();
        }
        if (this.winner != 'empty') {
            alert(`Joueur ${this.winner} remporte la partie ! Relancez !!`);
            this.player = this.p1;
            this.winner = 'empty';
            this.DrawMyGame();
        }
    }
}