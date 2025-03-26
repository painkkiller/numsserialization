
function serialize(numbers) {
    if (numbers.length === 0) return "";

    const sorted = [...numbers].sort((a, b) => a - b);
    const counts = {};

    // Группируем повторяющиеся числа (чтобы избежать дублирования)
    for (const num of sorted) {
        counts[num] = (counts[num] || 0) + 1;
    }

    const uniqueSorted = Object.keys(counts).map(Number).sort((a, b) => a - b);
    let lastNum = 0;
    const compressed = [];

    for (const num of uniqueSorted) {
        const delta = num - lastNum;
        lastNum = num;
        compressed.push(delta > 0 ? delta.toString(36) : "0"); // Используем base36 для чисел
        if (counts[num] > 1) {
            compressed.push(`:${counts[num].toString(36)}`); // Добавляем количество, если число повторяется
        }
        compressed.push(","); // Разделитель
    }

    return compressed.join("").slice(0, -1); // Убираем последнюю запятую
}

function deserialize(str) {
    if (!str) return [];

    const parts = str.split(",");
    let current = 0;
    const result = [];

    for (const part of parts) {
        const [deltaStr, countStr] = part.split(":");
        const delta = parseInt(deltaStr, 36);
        current += delta;
        const count = countStr ? parseInt(countStr, 36) : 1;

        for (let i = 0; i < count; i++) {
            result.push(current);
        }
    }

    return result;
}

module.exports = { serialize, deserialize };

function generateRandomNumbers(count, min = 1, max = 300) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Проверяем коэффициент сжатия
function testCompressionRatio(numbers, description) {
    const originalJson = JSON.stringify(numbers);
    const serialized = serialize(numbers);
    const ratio = originalJson.length / serialized.length;
    console.log(`Тест: ${description}`);
    console.log(`  Исходная длина: ${originalJson.length}`);
    console.log(`  Сжатая длина: ${serialized.length}`);
    console.log(`  Коэффициент сжатия: ${ratio.toFixed(2)}x`);
    console.log(`  Пример сжатой строки: "${serialized.slice(0, 50)}..."`);
    console.log("---");
}

// Различные тестовые наборы
testCompressionRatio(generateRandomNumbers(50), "50 случайных чисел");
testCompressionRatio(generateRandomNumbers(100), "100 случайных чисел");
testCompressionRatio(generateRandomNumbers(500), "500 случайных чисел");
testCompressionRatio(generateRandomNumbers(1000), "1000 случайных чисел");

// Граничные случаи
testCompressionRatio(Array(100).fill(1), "100 единиц");
testCompressionRatio(Array(1000).fill(5), "1000 пятерок");
testCompressionRatio(Array.from({ length: 90 }, (_, i) => i + 10), "90 двузначных чисел");
testCompressionRatio(Array.from({ length: 200 }, (_, i) => i + 100), "200 трехзначных чисел");
testCompressionRatio([...Array(100).fill(1), ...Array(100).fill(2), ...Array(100).fill(3)], "300 чисел (1,2,3)");