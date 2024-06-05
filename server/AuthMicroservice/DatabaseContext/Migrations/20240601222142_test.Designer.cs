﻿// <auto-generated />
using System;
using AuthMicroservice.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DataAccess.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240601222142_test")]
    partial class test
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.19")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("AuthMicroservice.DataAccess.Models.Tokens", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("AccessToken")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("ExpiresAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("AccessToken");

                    b.HasIndex("RefreshToken");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Tokens");
                });

            modelBuilder.Entity("AuthMicroservice.DataAccess.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Salt")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid?>("TokensId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("Email");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("AuthMicroservice.DataAccess.Models.Tokens", b =>
                {
                    b.HasOne("AuthMicroservice.DataAccess.Models.User", "User")
                        .WithOne("Tokens")
                        .HasForeignKey("AuthMicroservice.DataAccess.Models.Tokens", "UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("AuthMicroservice.DataAccess.Models.User", b =>
                {
                    b.Navigation("Tokens");
                });
#pragma warning restore 612, 618
        }
    }
}
