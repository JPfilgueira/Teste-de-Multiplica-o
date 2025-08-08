// Função a ser testada
    function multiplicacao(a, b) {
      if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Ambos os parâmetros devem ser números');
      }
      return a * b;
    }

    // Framework de testes simples
    class TestRunner {
      constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
      }
      
      addTest(description, testFunction) {
        this.tests.push({ description, testFunction });
      }
      
      runTests() {
        const resultsContainer = document.getElementById('testResultsContainer');
        resultsContainer.innerHTML = '';
        
        this.tests.forEach(test => {
          const testCaseElement = document.createElement('div');
          
          try {
            const result = test.testFunction();
            this.passed++;
            testCaseElement.className = 'test-case passed';
            testCaseElement.innerHTML = `
              <span class="status-icon">✓</span>
              <span>${test.description}</span>
            `;
          } catch (error) {
            this.failed++;
            testCaseElement.className = 'test-case failed';
            testCaseElement.innerHTML = `
              <span class="status-icon">✗</span>
              <span>${test.description} - ${error.message}</span>
            `;
          }
          
          resultsContainer.appendChild(testCaseElement);
        });
        
        this.updateSummary();
      }
      
      updateSummary() {
        const summaryElement = document.getElementById('testSummary');
        const total = this.passed + this.failed;
        const percentage = Math.round((this.passed / total) * 100);
        
        summaryElement.innerHTML = `
          Total: ${total} testes | 
          Aprovados: <span style="color: var(--success-color)">${this.passed}</span> | 
          Reprovados: <span style="color: var(--error-color)">${this.failed}</span> | 
          Taxa de sucesso: ${percentage}%
        `;
      }
    }

    // Configuração e execução dos testes
    const testRunner = new TestRunner();
    
    // Adiciona testes
    testRunner.addTest('Multiplicação de dois números positivos', () => {
      const result = multiplicacao(2, 3);
      if (result !== 6) throw new Error(`Esperado 6, mas recebido ${result}`);
      return true;
    });
    
    testRunner.addTest('Multiplicação com um número negativo', () => {
      const result = multiplicacao(-2, 3);
      if (result !== -6) throw new Error(`Esperado -6, mas recebido ${result}`);
      return true;
    });
    
    testRunner.addTest('Multiplicação por zero', () => {
      const result = multiplicacao(5, 0);
      if (result !== 0) throw new Error(`Esperado 0, mas recebido ${result}`);
      return true;
    });
    
    testRunner.addTest('Multiplicação de dois números negativos', () => {
      const result = multiplicacao(-2, -3);
      if (result !== 6) throw new Error(`Esperado 6, mas recebido ${result}`);
      return true;
    });
    
    testRunner.addTest('Validação de entrada não numérica', () => {
      try {
        multiplicacao('2', 3);
        throw new Error('Deveria ter lançado um erro para entrada não numérica');
      } catch (error) {
        if (error.message !== 'Ambos os parâmetros devem ser números') {
          throw new Error(`Mensagem de erro inesperada: ${error.message}`);
        }
        return true;
      }
    });
    
    // Executa os testes quando a página carrega
    window.addEventListener('DOMContentLoaded', () => {
      testRunner.runTests();
      
      // Também exibe no console para referência
      console.group('Resultados dos Testes');
      console.log(`Total: ${testRunner.tests.length} testes`);
      console.log(`Aprovados: ${testRunner.passed}`);
      console.log(`Reprovados: ${testRunner.failed}`);
      console.groupEnd();
    });