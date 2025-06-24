<?php

require_once 'TranslationUnit.php';

class TranslationUnitManager
{
    private array $units = [];
    private array $history = [];
    private int $nextId = 1;

    public function addUnit(string $source, string $translated, string $from, string $to): int
    {
        $unit = new TranslationUnit($this->nextId, $source, $translated, $from, $to);
        $this->units[$unit->id] = $unit;
        return $this->nextId++;
    }

    public function getUnit(int $id): ?TranslationUnit
    {
        return $this->units[$id] ?? null;
    }

    public function updateUnit(int $id, string $newTranslation): bool
    {
        if (!isset($this->units[$id])) {
            return false;
        }

        $this->history[] = [
            'translation_unit_id' => $id,
            'old_translated_text' => $this->units[$id]->translatedText,
            'updated_at' => date('Y-m-d H:i:s')
        ];

        $this->units[$id]->updateTranslation($newTranslation);

        return true;
    }

    public function getHistory(): array
    {
        return $this->history;
    }
}