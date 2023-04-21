/*
 * Copyright (c) 2023 Simone 'evilsocket' Margaritelli - evilsocket@gmail.com.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
#include <openssl/conf.h>
#include <openssl/evp.h>
#include <openssl/err.h>
#include <string.h>
#include <stdio.h>

// as seen in /usr/lib/libzc.so / SetupKeys
static unsigned char KEY_MATERIAL[] = {
    0x13, 0x27, 0x3f, 0x42,
    0xa5, 0xb6, 0x79, 0xe8,
    0x20, 0x31, 0xc4, 0xf5,
    0x16, 0x17, 0x88, 0x2f,
    0x43, 0xa4, 0x55, 0x69,
    0x77, 0xb8, 0xe2, 0x83,
    0x04, 0x05, 0x60, 0x70,
    0x80, 0x02, 0x03, 0x04,
    0x50, 0x6a, 0x7c, 0x8a,
    0x02, 0x30, 0x40, 0x51,
    0x6a, 0x7d, 0x8d, 0x22,
    0x33, 0x44, 0x59, 0x66,
    0x71, 0x08, 0x02, 0x03,
    0x43, 0x05, 0x67, 0x7a,
    0x8f};

int main(int argc, char **argv)
{
    if (argc != 3)
    {
        printf("Usage: %s <serial number> <encrypted file>\n", argv[0]);
        return 1;
    }

    char *serialNumber = argv[1],
         *inputFileName = argv[2];

    unsigned long serialSize = strlen(serialNumber);
    if (serialSize != 9)
    {
        printf("the serial number must be 9 characters long.\n");
        return 1;
    }

    // concatenate the hardcoded key material with the serial number from /etc/qc_sn
    unsigned long key_material_size = sizeof(KEY_MATERIAL) / sizeof(KEY_MATERIAL[0]);
    unsigned char *key_material = (unsigned char *)malloc(key_material_size + serialSize);

    memcpy(key_material, KEY_MATERIAL, key_material_size);
    memcpy(key_material + key_material_size, serialNumber, serialSize);

    key_material_size += serialSize;

    // derive the actual key and iv from it
    unsigned char key[32] = {0};
    unsigned char iv[32] = {0};

    int iterations = 10;
    const EVP_CIPHER *pCipher = EVP_aes_128_ctr();
    const EVP_MD *pDigest = EVP_sha1();

    int derivedKeySize = EVP_BytesToKey(
        pCipher,
        pDigest,
        NULL, // no salt
        key_material,
        key_material_size,
        iterations,
        key,
        iv);

    if (derivedKeySize != 16)
    {
        printf("wrong derived key size: %d\n", derivedKeySize);
        return 1;
    }

    // read the encrypted file
    FILE *fp = fopen(inputFileName, "rb");
    if (!fp)
    {
        printf("can't open %s\n", inputFileName);
        return 1;
    }

    fseek(fp, 0, SEEK_END);
    long input_size = ftell(fp);
    fseek(fp, 0, SEEK_SET);

    int ret, final_size, outlen;
    unsigned char *input = (unsigned char *)malloc(input_size),
                  *plaintext = (unsigned char *)malloc(input_size);

    long read = fread(input, 1, input_size, fp);

    fclose(fp);

    // decrypt it
    EVP_CIPHER_CTX *ctx = EVP_CIPHER_CTX_new();

    ret = EVP_DecryptInit_ex(ctx, pCipher, NULL, key, iv);
    if (ret != 1)
    {
        printf("EVP_DecryptInit_ex failed: %d\n", ret);
        return 1;
    }

    ret = EVP_DecryptUpdate(ctx, plaintext, &outlen, input, input_size);
    if (ret != 1)
    {
        printf("EVP_DecryptUpdate failed: %d\n", ret);
        return 1;
    }

    ret = EVP_DecryptFinal(ctx, &plaintext[outlen], &final_size);
    if (ret != 1)
    {
        printf("EVP_DecryptFinal failed: %d\n", ret);
        return 1;
    }

    // print it
    for (int i = 0; i < outlen; i++)
    {
        printf("%c", plaintext[i]);
    }
    printf("\n");

    return 0;
}