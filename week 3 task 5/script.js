
        const form = document.getElementById('reverseForm');
        const output = document.getElementById('output');

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const input = document.getElementById('statementInput').value.trim();

           
            const words = input.split(/\s+/);


            const reversed = words.map(word => word).reverse();

            
            const result = reversed.join(' ');

            console.log("Reversed:", result);
            output.textContent = "Reversed Statement: " + result;
        });
    